import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { borrarValoracion } from '../../Services/valoracionS.js';
import { tarjetaSx, botonConBrillo } from './estilos.js';

export default function MisValoraciones({ valoraciones, onEditar, onCambio }) {
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState(null);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta valoración?')) return;
    setEliminandoId(id);
    setError(null);
    const res = await borrarValoracion(id);
    setEliminandoId(null);
    if (res.success) onCambio();
    else setError(res.message);
  };

  if (valoraciones.length === 0) {
    return <Typography align="center" color="text.secondary">Aún no has hecho ninguna valoración.</Typography>;
  }

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 700, mx: 'auto' }}>
      {error && <Alert severity="error">{error}</Alert>}
      {valoraciones.map((v) => {
        const esEvento = Boolean(v.evento);
        const nombre = esEvento ? v.evento.nombre : `${v.trabajador?.nombre ?? ''} ${v.trabajador?.apellido ?? ''}`.trim();
        return (
          <Card key={v.id} variant="outlined" sx={tarjetaSx}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" component="h3">{nombre}</Typography>
                <Chip size="small" variant="outlined" label={esEvento ? 'Evento' : 'Trabajador'} />
              </Box>
              <Rating value={v.calificacion} readOnly />
              {v.comentario && <Typography sx={{ mt: 1 }}>{v.comentario}</Typography>}
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1 }}>
                {new Date(v.createdAt).toLocaleDateString('es-CL')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: 'divider' }}>
                <Button size="small" variant="outlined" onClick={() => onEditar(v)} sx={botonConBrillo()}>Editar</Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => handleEliminar(v.id)}
                  disabled={eliminandoId === v.id}
                  sx={botonConBrillo('error')}
                >
                  {eliminandoId === v.id ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
