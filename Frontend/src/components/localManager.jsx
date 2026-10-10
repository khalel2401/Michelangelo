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
import { getLocales, crearLocal, actualizarLocal, borrarLocal } from "../Services/localS.js";

const formVacio = {
    nombre: "",
    precio: "",
    contacto: "",
    nombreDueno: "",
    aforo: "",
    direccion: "",
    disponibilidad: true
}

const botonConBrillo = (color = "primary") => (theme) => ({
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
    transform: "translateY(-4px)",
  },
});

export function localManager(){
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // null = creando, id = editando
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchLocales();
  }, []);
  
  const fetchLocales = async () => {
    setCargando(true);
    setError(null);

    try {
        const data = await getLocales();
        if (!data.success) {
          throw new Error(data.message);
        }
        setLocales(Array.isArray(data.data) ? data.data : []);
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

 const abrirEditar = (local) => {
    setEditandoId(local.id);
    setFormData({
    nombre: local.nombre,
    precio: local.precio,
    contacto: local.contacto,
    nombreDueno: local.nombreDueno,
    aforo: local.aforo,
    direccion: local.direccion,
    disponibilidad: local.disponibilidad,
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

    const datosLocal = {
      ...formData,
      precio: Number(formData.precio),
      aforo: Number(formData.aforo),
    };

    try {
      const res = editandoId
        ? await actualizarLocal(editandoId, datosLocal)
        : await crearLocal(datosLocal);

      if (res.success) {
        if (editandoId) {
          setLocales((actuales) => actuales.map((local) => (local.id === editandoId ? res.data : local)));
        } else {
          setLocales((actuales) => [...actuales, res.data]);
        }
        cancelarForm();
      } else {
        setErrorForm(res.message);
      }
    } catch (err) {
      setErrorForm(err.message || "No se pudo guardar el local");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este local?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarLocal(id);

    if (res.success) {
      setLocales(locales.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  const renderFormulario = (esEdicion) => (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 1.5 }}>
      <Typography variant="h6" component="h3">
        {esEdicion ? "Editar local" : "Nuevo local"}
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
        label="Precio"
        name="precio"
        type="number"
        inputProps={{ min: 0, step: "any" }}
        value={formData.precio}
        onChange={handleChange}
        required
        size="small"
      />
      <TextField
        label="Número de contacto"
        name="contacto"
        value={formData.contacto}
        onChange={handleChange}
        inputProps={{ minLength: 8, maxLength: 12 }}
        required
        size="small"
      />
      <TextField
        label="Dueño del local"
        name="nombreDueno"
        value={formData.nombreDueno}
        onChange={handleChange}
        required
        size="small"
      />
      <TextField
        label="Aforo"
        name="aforo"
        type="number"
        inputProps={{ min: 0, step: 1 }}
        value={formData.aforo}
        onChange={handleChange}
        required
        size="small"
      />
      <TextField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        required
        size="small"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="disponibilidad"
            checked={formData.disponibilidad}
            onChange={handleChange}
          />
        }
        label="Disponible"
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
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
        Locales
      </Typography>
      {cargando && <Typography role="status" textAlign="center">Cargando locales...</Typography>}
      {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}

      {!cargando && !error && locales.length === 0 && (
        <Typography textAlign="center" sx={{ mb: 2 }}>No existen locales.</Typography>
      )}

      {!cargando && !error && locales.length > 0 && (
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
          {locales.map((local) => {
            const editandoEsteLocal = editandoId === local.id;

            return (
              <Card
                key={local.id}
                variant="outlined"
                sx={(theme) => ({
                  width: "100%",
                  aspectRatio: editandoEsteLocal ? "auto" : "1 / 1",
                  minHeight: editandoEsteLocal ? 0 : 300,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.brand.crimson}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
                  animation: "localFadeIn 450ms ease-out both",
                  "@keyframes localFadeIn": {
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
                  {editandoEsteLocal ? (
                    renderFormulario(true)
                  ) : (
                    <>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {local.nombre}
                      </Typography>
                      <Chip
                        label={local.disponibilidad ? "Disponible" : "No disponible"}
                        color={local.disponibilidad ? "success" : "default"}
                        size="small"
                        sx={{ alignSelf: "flex-start", mb: 2 }}
                      />
                      <Box sx={{ display: "grid", gap: 1, flex: 1 }}>
                        <Typography><strong>Precio:</strong> {local.precio}</Typography>
                        <Typography><strong>Contacto:</strong> {local.contacto}</Typography>
                        <Typography><strong>Dueño:</strong> {local.nombreDueno}</Typography>
                        <Typography><strong>Aforo:</strong> {local.aforo}</Typography>
                        <Typography><strong>Dirección:</strong> {local.direccion}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                        <Button size="small" variant="outlined" onClick={() => abrirEditar(local)} sx={botonConBrillo()}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleEliminar(local.id)}
                          disabled={eliminandoId === local.id}
                          sx={botonConBrillo("error")}
                        >
                          {eliminandoId === local.id ? "Eliminando..." : "Eliminar"}
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
            Agregar nuevo local
          </Button>
        </Box>
      )}
    </Box>
  );
}