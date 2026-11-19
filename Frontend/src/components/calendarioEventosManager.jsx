// src/components/CalendarioEventos.jsx
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CalendarioEventos({ eventos }) {
  // Estado interno del calendario
  const [fechaActual, setFechaActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  // Lógica de fechas
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();
  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesAnterior = () => setFechaActual(new Date(anio, mes - 1, 1));
  const mesSiguiente = () => setFechaActual(new Date(anio, mes + 1, 1));

  const diaInicioSemana = new Date(anio, mes, 1).getDay();
  const primerDiaSemana = (diaInicioSemana + 6) % 7; 
  const totalDiasMes = new Date(anio, mes + 1, 0).getDate();

  const obtenerEventosDelDia = (dia) => {
    return eventos.filter((ev) => {
      const f = new Date(ev.fecha || ev.fechaInicio || ev.createdAt);
      return (
        f.getDate() === dia &&
        f.getMonth() === mes &&
        f.getFullYear() === anio
      );
    });
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        {/* Header del Calendario */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <IconButton onClick={mesAnterior}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {nombresMeses[mes]} {anio}
          </Typography>
          <IconButton onClick={mesSiguiente}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Días de la semana */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, mb: 1, textAlign: "center" }}>
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
            <Typography key={d} variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>
              {d}
            </Typography>
          ))}
        </Box>

        {/* Cuadrícula numérica */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
          {Array.from({ length: primerDiaSemana }).map((_, i) => (
            <Box key={`vacio-${i}`} />
          ))}

          {Array.from({ length: totalDiasMes }).map((_, i) => {
            const dia = i + 1;
            const eventosDia = obtenerEventosDelDia(dia);
            const tieneEvento = eventosDia.length > 0;

            return (
              <Paper
                key={dia}
                variant="outlined"
                onClick={() => {
                  if (tieneEvento) {
                    setDiaSeleccionado({ dia, lista: eventosDia });
                  }
                }}
                sx={(theme) => ({
                  p: 1,
                  minHeight: 45,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: tieneEvento ? "pointer" : "default",
                  backgroundColor: tieneEvento ? theme.palette.success.main : theme.palette.background.paper,
                  color: tieneEvento ? "#fff" : "inherit",
                  borderRadius: 2,
                })}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {dia}
                </Typography>
                {tieneEvento && (
                  <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
                    {eventosDia.length} ev.
                  </Typography>
                )}
              </Paper>
            );
          })}
        </Box>
      </Paper>

      {/* Detalles del día seleccionado */}
      {diaSeleccionado && (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid green', mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Eventos del día {diaSeleccionado.dia} de {nombresMeses[mes]}
            </Typography>
            <Button size="small" variant="outlined" onClick={() => setDiaSeleccionado(null)}>
              Cerrar
            </Button>
          </Box>

          {diaSeleccionado.lista.map((ev, index) => (
            <Card key={ev.id || index} variant="outlined" sx={{ mb: 1.5, borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" color="primary">
                  {ev.nombre || `Evento #${ev.id}`}
                </Typography>
                {ev.estado && (
                  <Chip label={ev.estado} color="success" size="small" sx={{ my: 1 }} />
                )}
                <Box sx={{ display: "grid", gap: 0.5, mt: 1 }}>
                  {ev.descripcion && <Typography variant="body2"><strong>Descripción:</strong> {ev.descripcion}</Typography>}
                  {ev.contacto && <Typography variant="body2"><strong>Contacto:</strong> {ev.contacto}</Typography>}
                  {ev.local && <Typography variant="body2"><strong>Local:</strong> {ev.local.nombre || ev.local}</Typography>}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Paper>
      )}
    </>
  );
}