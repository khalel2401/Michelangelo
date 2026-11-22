import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { getServicios, crearServicio, actualizarServicio, borrarServicio } from "../Services/servicioS.js";

const formVacio = {
  nombre: "",
  precio: "",
  descripcion: "",
  activo: true,
};

const botonConBrillo = (color = "primary") => (theme) => ({
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
    transform: "translateY(-4px)",
  },
});

export function servicioManager(){
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    setCargando(true);
    setError(null);

    try {
      const data = await getServicios();
      if (!data.success) {
        throw new Error(data.message);
      }
      setServicios(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const abrirCrear = () => {
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
    setMostrarForm(true);
  };

  const abrirEditar = (servicio) => {
    setEditandoId(servicio.id);
    setFormData({
      nombre: servicio.nombre,
      precio: servicio.precio,
      descripcion: servicio.descripcion || "",
      activo: servicio.activo ?? true,
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

    const datosServicio = {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      descripcion: formData.descripcion || undefined,
      activo: Boolean(formData.activo),
    };

    try {
      const res = editandoId
        ? await actualizarServicio(editandoId, datosServicio)
        : await crearServicio(datosServicio);

      if (res.success) {
        if (editandoId) {
          setServicios((actuales) => actuales.map((s) => (s.id === editandoId ? res.data : s)));
        } else {
          setServicios((actuales) => [...actuales, res.data]);
        }
        cancelarForm();
      } else {
        setErrorForm(res.message);
      }
    } catch (err) {
      setErrorForm(err.message || "No se pudo guardar el servicio");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este servicio?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarServicio(id);

    if (res.success) {
      setServicios(servicios.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  const renderFormulario = (esEdicion) => (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 1.5 }}>
      <Typography variant="h6" component="h3">
        {esEdicion ? "Editar servicio" : "Nuevo servicio"}
      </Typography>
      {errorForm && <Alert severity="error">{errorForm}</Alert>}

      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        inputProps={{ maxLength: 100 }}
        required
        size="small"
      />

      <TextField
        label="Precio"
        name="precio"
        type="number"
        inputProps={{ min: 0.01, step: "any" }}
        value={formData.precio}
        onChange={handleChange}
        required
        size="small"
      />

      <TextField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        inputProps={{ maxLength: 200 }}
        multiline
        rows={2}
        size="small"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
        }
        label="Activo"
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
        Servicios
      </Typography>
      {cargando && <Typography role="status" align="center">Cargando servicios...</Typography>}
      {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}

      {!cargando && !error && servicios.length === 0 && (
        <Typography align="center" sx={{ mb: 2 }}>No existen servicios.</Typography>
      )}

      {!cargando && !error && servicios.length > 0 && (
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
          {servicios.map((servicio) => {
            const editandoEsteServicio = editandoId === servicio.id;

            return (
              <Card
                key={servicio.id}
                variant="outlined"
                sx={(theme) => ({
                  width: "100%",
                  aspectRatio: editandoEsteServicio ? "auto" : "1 / 1",
                  minHeight: editandoEsteServicio ? 0 : 300,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.brand.crimson}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
                  animation: "servicioFadeIn 450ms ease-out both",
                  "@keyframes servicioFadeIn": {
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
                  {editandoEsteServicio ? (
                    renderFormulario(true)
                  ) : (
                    <>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {servicio.nombre}
                      </Typography>
                      <Chip
                        label={servicio.activo ? "Activo" : "Inactivo"}
                        color={servicio.activo ? "success" : "default"}
                        size="small"
                        sx={{ alignSelf: "flex-start", mb: 2 }}
                      />
                      <Box sx={{ display: "grid", gap: 1, flex: 1 }}>
                        <Typography><strong>Precio:</strong> ${servicio.precio}</Typography>
                        <Typography><strong>Descripción:</strong> {servicio.descripcion || "Sin descripción"}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                        <Button size="small" variant="outlined" onClick={() => abrirEditar(servicio)} sx={botonConBrillo()}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleEliminar(servicio.id)}
                          disabled={eliminandoId === servicio.id}
                          sx={botonConBrillo("error")}
                        >
                          {eliminandoId === servicio.id ? "Eliminando..." : "Eliminar"}
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
            Agregar nuevo servicio
          </Button>
        </Box>
      )}
    </Box>
  );
}