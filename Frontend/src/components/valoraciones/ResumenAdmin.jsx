import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getResumenEvento, getResumenTrabajador } from '../../Services/valoracionS.js';

// Solo admins. Recuerda: ocultarlo en pantalla es COMODIDAD; el backend lo protege de verdad (soloAdmin -> 403).
export default function ResumenAdmin({ eventos, trabajadores }) {
  const [tipo, setTipo] = useState('evento');
  const [id, setId] = useState('');
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const opciones = tipo === 'evento'
    ? eventos.map((e) => ({ id: e.id, texto: e.nombre }))
    : trabajadores.map((t) => ({ id: t.id, texto: `${t.nombre} ${t.apellido}` }));

  useEffect(() => {
    if (!id) return undefined;
    let activo = true; // evita pintar una respuesta vieja si el usuario cambió de opción rápido
    setCargando(true);
    setError(null);
    setResumen(null);
    const pedir = tipo === 'evento' ? getResumenEvento : getResumenTrabajador;
    pedir(id).then((res) => {
      if (!activo) return;
      if (res.success) setResumen(res.data);
      else setError(res.message);
      setCargando(false);
    });
    return () => { activo = false; };
  }, [tipo, id]);

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 700, mx: 'auto' }}>
      <TextField select size="small" label="Ver resumen de" value={tipo} onChange={(e) => { setTipo(e.target.value); setId(''); setResumen(null); }}>
        <MenuItem value="evento">Un evento</MenuItem>
        <MenuItem value="trabajador">Un trabajador</MenuItem>
      </TextField>
      <TextField select size="small" label={tipo === 'evento' ? 'Evento' : 'Trabajador'} value={id} onChange={(e) => setId(e.target.value)}>
        {opciones.map((o) => <MenuItem key={o.id} value={o.id}>{o.texto}</MenuItem>)}
      </TextField>

      {cargando && <Typography role="status">Cargando resumen...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}

      {resumen && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={resumen.promedio ?? 0} precision={0.1} readOnly />
            <Typography>
              {resumen.promedio === null ? 'Sin valoraciones' : `${resumen.promedio} (${resumen.total} ${resumen.total === 1 ? 'valoración' : 'valoraciones'})`}
            </Typography>
          </Box>
          {resumen.valoraciones.map((v) => (
            <Typography key={v.id} variant="body2">
              <strong>{v.autor.nombre} {v.autor.apellido}</strong>: {v.calificacion}★{v.comentario ? ` · ${v.comentario}` : ''}
            </Typography>
          ))}
        </>
      )}
    </Box>
  );
}
