import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { getEventos, crearEvento, actualizarEvento, borrarEvento } from "../Services/eventoS.js";

const formVacio = {
  nombre: "",
  fecha: "",
  cotizacionId: "",
};

const botonConBrillo = (color = "primary") => (theme) => ({
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
    transform: "translateY(-4px)",
  },
});

export function eventoManager() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    setCargando(true);
    setError(null);

    try {
      const data = await getEventos();
      if (!data.success) {
        throw new Error(data.message);
      }
      setEventos(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const abrirCrear = () => {
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
    setMostrarForm(true);
  };

  const abrirEditar = (evento) => {
    setEditandoId(evento.id);
    setFormData({
      nombre: evento.nombre,
      fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
      cotizacionId: evento.cotizacionId,
    });
    setErrorForm(null);
  };

  const cancelarForm = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm(null);

    const datosEvento = {
      nombre: formData.nombre,
      fecha: new Date(formData.fecha).toISOString(),
      cotizacionId: Number(formData.cotizacionId),
    };

    try {
      const res = editandoId
        ? await actualizarEvento(editandoId, datosEvento)
        : await crearEvento(datosEvento);

      if (res.success) {
        if (editandoId) {
          setEventos((actuales) =>
            actuales.map((e) => (e.id === editandoId ? res.data : e))
          );
        } else {
          setEventos((actuales) => [...actuales, res.data]);
        }
        cancelarForm();
      } else {
        setErrorForm(res.message);
      }
    } catch (err) {
      setErrorForm(err.message || "No se pudo guardar el evento");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este evento?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarEvento(id);

    if (res.success) {
      setEventos(eventos.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  const renderFormulario = (esEdicion) => (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 1.5 }}>
      <Typography variant="h6" component="h3">
        {esEdicion ? "Editar evento" : "Nuevo evento"}
      </Typography>
      {errorForm && <Alert severity="error">{errorForm}</Alert>}

      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        size="small"
      />
      <TextField
        label="Fecha"
        name="fecha"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.fecha}
        onChange={handleChange}
        required
        size="small"
      />
      <TextField
        label="ID Cotización"
        name="cotizacionId"
        type="number"
        inputProps={{ min: 1 }}
        value={formData.cotizacionId}
        onChange={handleChange}
        required
        size="small"
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" disabled={guardando} sx={botonConBrillo()}>
          {guardando ? "Guardando..." : "Guardar"}
        </Button>
        <Button type="button" onClick={cancelarForm} disabled={guardando} sx={botonConBrillo()}>
          Cancelar
        </Button>
      </Box>
    </form>
  );

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Eventos
      </Typography>
      {cargando && <Typography role="status" align="center">Cargando eventos...</Typography>}
      {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}

      {!cargando && !error && eventos.length === 0 && (
        <Typography align="center" sx={{ mb: 2 }}>No existen eventos.</Typography>
      )}

      {!cargando && !error && eventos.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 340px))",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 3,
            mb: 3,
          }}
        >
          {eventos.map((evento) => {
            const editandoEsteEvento = editandoId === evento.id;

            return (
              <Card
                key={evento.id}
                variant="outlined"
                sx={(theme) => ({
                  width: "100%",
                  aspectRatio: editandoEsteEvento ? "auto" : "1 / 1",
                  minHeight: editandoEsteEvento ? 0 : 300,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.brand.crimson}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
                  animation: "eventoFadeIn 450ms ease-out both",
                  "@keyframes eventoFadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                  transition: "box-shadow 180ms ease, transform 180ms ease",
                  "&:hover": {
                    boxShadow: `0 0 20px ${alpha(theme.palette.brand.crimson, 0.55)}`,
                    transform: "translateY(-4px)",
                  },
                })}
              >
                <CardContent sx={{ p: 2.5, display: "flex", flex: 1, flexDirection: "column" }}>
                  {editandoEsteEvento ? (
                    renderFormulario(true)
                  ) : (
                    <>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {evento.nombre}
                      </Typography>
                      <Box sx={{ display: "grid", gap: 1, flex: 1 }}>
                        <Typography>
                          <strong>Fecha:</strong> {evento.fecha ? evento.fecha.split("T")[0] : ""}
                        </Typography>
                        <Typography>
                          <strong>Cotización ID:</strong> #{evento.cotizacionId}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                        <Button size="small" variant="outlined" onClick={() => abrirEditar(evento)} sx={botonConBrillo()}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleEliminar(evento.id)}
                          disabled={eliminandoId === evento.id}
                          sx={botonConBrillo("error")}
                        >
                          {eliminandoId === evento.id ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {mostrarForm ? (
        <Paper variant="outlined" sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 3 }}>
          {renderFormulario(false)}
        </Paper>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={abrirCrear} sx={botonConBrillo()}>
            Agregar nuevo evento
          </Button>
        </Box>
      )}
    </Box>
  );
}