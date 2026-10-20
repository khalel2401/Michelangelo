import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { getCotizaciones, crearCotizacion, actualizarCotizacion, borrarCotizacion } from "../Services/cotizacionS.js";
import { getLocales } from "../Services/localS.js";

const formVacio = {
  cantidadPersonas: "",
  valorTotal: "",
  abono: "",
  localId: "",
};

const botonConBrillo = (color = "primary") => (theme) => ({
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
    transform: "translateY(-4px)",
  },
});

export function cotizacionManager(){
  const [cotizaciones, setCotizaciones] = useState([]);
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    setCargando(true);
    setError(null);

    try {
      const data = await getCotizaciones();
      if (!data.success) {
        throw new Error(data.message);
      }
      setCotizaciones(Array.isArray(data.data) ? data.data : []);

      const resLocales = await getLocales();
      if (resLocales.success) {
        setLocales(Array.isArray(resLocales.data) ? resLocales.data : []);
      }
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

  const abrirEditar = (cotizacion) => {
    setEditandoId(cotizacion.id);
    setFormData({
      cantidadPersonas: cotizacion.cantidadPersonas,
      valorTotal: cotizacion.valorTotal,
      abono: cotizacion.abono,
      localId: cotizacion.localId || "",
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

    const datosCotizacion = {
      localId: Number(formData.localId),
      cantidadPersonas: Number(formData.cantidadPersonas),
      valorTotal: Number(formData.valorTotal),
      abono: Number(formData.abono),
    };

    try {
      const res = editandoId
        ? await actualizarCotizacion(editandoId, datosCotizacion)
        : await crearCotizacion(datosCotizacion);

      if (res.success) {
        if (editandoId) {
          setCotizaciones((actuales) => actuales.map((cot) => (cot.id === editandoId ? res.data : cot)));
        } else {
          setCotizaciones((actuales) => [...actuales, res.data]);
        }
        cancelarForm();
      } else {
        setErrorForm(res.message);
      }
    } catch (err) {
      setErrorForm(err.message || "No se pudo guardar la cotización");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta cotización?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarCotizacion(id);

    if (res.success) {
      setCotizaciones(cotizaciones.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  const renderFormulario = (esEdicion) => (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 1.5 }}>
      <Typography variant="h6" component="h3">
        {esEdicion ? "Editar cotización" : "Nueva cotización"}
      </Typography>
      {errorForm && <Alert severity="error">{errorForm}</Alert>}

      <TextField
        select
        label="Local"
        name="localId"
        value={formData.localId}
        onChange={handleChange}
        required
        size="small"
      >
        {locales.map((local) => (
          <MenuItem key={local.id} value={local.id}>
            {local.nombre} (Aforo: {local.aforo})
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Cantidad de personas"
        name="cantidadPersonas"
        type="number"
        inputProps={{ min: 1, step: 1 }}
        value={formData.cantidadPersonas}
        onChange={handleChange}
        required
        size="small"
      />

      <TextField
        label="Valor total"
        name="valorTotal"
        type="number"
        inputProps={{ min: 0, step: "any" }}
        value={formData.valorTotal}
        onChange={handleChange}
        required
        size="small"
      />

      <TextField
        label="Abono"
        name="abono"
        type="number"
        inputProps={{ min: 0, step: "any" }}
        value={formData.abono}
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
        Cotizaciones
      </Typography>
      {cargando && <Typography role="status" align="center">Cargando cotizaciones...</Typography>}
      {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}

      {!cargando && !error && cotizaciones.length === 0 && (
        <Typography align="center" sx={{ mb: 2 }}>No existen cotizaciones.</Typography>
      )}

      {!cargando && !error && cotizaciones.length > 0 && (
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
          {cotizaciones.map((cotizacion) => {
            const editandoEstaCotizacion = editandoId === cotizacion.id;
            const localAsociado = locales.find((l) => l.id === cotizacion.localId) || cotizacion.local;

            return (
              <Card
                key={cotizacion.id}
                variant="outlined"
                sx={(theme) => ({
                  width: "100%",
                  aspectRatio: editandoEstaCotizacion ? "auto" : "1 / 1",
                  minHeight: editandoEstaCotizacion ? 0 : 300,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.brand.crimson}`,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
                  animation: "cotizacionFadeIn 450ms ease-out both",
                  "@keyframes cotizacionFadeIn": {
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
                  {editandoEstaCotizacion ? (
                    renderFormulario(true)
                  ) : (
                    <>
                      <Typography variant="h5" component="h3" gutterBottom>
                        Cotización #{cotizacion.id}
                      </Typography>
                      <Chip
                        label={cotizacion.estado || "pendiente"}
                        color={
                          cotizacion.estado === "aprobada"
                            ? "success"
                            : cotizacion.estado === "rechazada"
                            ? "error"
                            : "default"
                        }
                        size="small"
                        sx={{ alignSelf: "flex-start", mb: 2, textTransform: "capitalize" }}
                      />
                      <Box sx={{ display: "grid", gap: 1, flex: 1 }}>
                        <Typography><strong>Local:</strong> {localAsociado ? localAsociado.nombre : "Sin asignar"}</Typography>
                        <Typography><strong>Cantidad de personas:</strong> {cotizacion.cantidadPersonas}</Typography>
                        <Typography><strong>Valor total:</strong> ${cotizacion.valorTotal}</Typography>
                        <Typography><strong>Abono:</strong> ${cotizacion.abono}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                        <Button size="small" variant="outlined" onClick={() => abrirEditar(cotizacion)} sx={botonConBrillo()}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleEliminar(cotizacion.id)}
                          disabled={eliminandoId === cotizacion.id}
                          sx={botonConBrillo("error")}
                        >
                          {eliminandoId === cotizacion.id ? "Eliminando..." : "Eliminar"}
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
            Agregar nueva cotización
          </Button>
        </Box>
      )}
    </Box>
  );
}