import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { crearValoracion, actualizarValoracion } from '../../Services/valoracionS.js';

// Un solo formulario para CREAR y EDITAR:
//   crear  -> recibe `objetivo` = { tipo: 'evento' | 'trabajador', id, titulo }
//   editar -> recibe `valoracion` (la que ya existe)
export default function ValoracionForm({ open, onClose, onGuardado, objetivo, valoracion }) {
  const editando = Boolean(valoracion);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Cada vez que se abre el diálogo, partimos de los valores correctos.
  useEffect(() => {
    if (open) {
      setCalificacion(valoracion?.calificacion ?? 0);
      setComentario(valoracion?.comentario ?? '');
      setError(null);
    }
  }, [open, valoracion]);

  const titulo = editando
    ? valoracion.evento?.nombre ?? `${valoracion.trabajador?.nombre ?? ''} ${valoracion.trabajador?.apellido ?? ''}`.trim()
    : objetivo?.titulo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (calificacion < 1) {
      setError('Elige de 1 a 5 estrellas');
      return;
    }
    setGuardando(true);
    setError(null);

    const texto = comentario.trim() || undefined; // el backend rechaza comentario vacío; undefined = "no enviarlo"
    const res = editando
      ? await actualizarValoracion(valoracion.id, { calificacion, comentario: texto })
      : await crearValoracion({
          calificacion,
          comentario: texto,
          // el backend exige UNO solo: eventoId o trabajadorId
          ...(objetivo.tipo === 'evento' ? { eventoId: objetivo.id } : { trabajadorId: objetivo.id }),
        });

    setGuardando(false);
    if (res.success) {
      onGuardado(); // el padre recarga las listas
      onClose();
    } else {
      setError(res.message); // ej: "Ya se ha realizado una valoracion para este evento o trabajador"
    }
  };

  return (
    <Dialog open={open} onClose={guardando ? undefined : onClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{editando ? 'Editar valoración' : 'Nueva valoración'}</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 1 }}>
          <Typography variant="subtitle1">{titulo}</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Rating
            size="large"
            value={calificacion}
            onChange={(_, valor) => setCalificacion(valor ?? 0)} // valor es null si repiten la misma estrella
          />
          <TextField
            label="Comentario (opcional)"
            multiline
            minRows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            helperText={`${comentario.length}/1000`}
            slotProps={{ htmlInput: { maxLength: 1000 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose} disabled={guardando}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
