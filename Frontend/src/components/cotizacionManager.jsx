import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";

import { getCotizaciones, crearCotizacion, actualizarCotizacion, borrarCotizacion } from "../Services/cotizacionS.js";
import { getLocales } from "../Services/localS.js";
import { getServicios } from "../Services/servicioS.js"; 

const formVacio = {
  cantidadPersonas: "",
  abono: "",
  localId: "",
  serviciosIds: [],
};

export function cotizacionManager(){
  const [cotizaciones, setCotizaciones] = useState([]); 
  const [locales, setLocales] = useState([]); 
  const [servicios, setServicios] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados del formulario y UI
  const [mostrarAlta, setMostrarAlta] = useState(false);
  const [editandoId, setEditandoId] = useState(null); 
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  // Estados de los Filtros
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [busquedaId, setBusquedaId] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getCotizaciones();
      if (!data.success) throw new Error(data.message);
      setCotizaciones(Array.isArray(data.data) ? data.data : []);

      const resLocales = await getLocales();
      if (resLocales.success) setLocales(Array.isArray(resLocales.data) ? resLocales.data : []);

      const resServicios = await getServicios();
      if (resServicios.success) setServicios(Array.isArray(resServicios.data) ? resServicios.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "serviciosIds") {
      const valores = typeof value === 'string' ? value.split(',') : value;
      setFormData({ ...formData, [name]: valores.map(Number) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calcularTotal = () => {
    let total = 0;
    if (formData.localId) {
      const localElegido = locales.find(l => l.id === Number(formData.localId));
      if (localElegido) total += Number(localElegido.precio || 0);
    }
    formData.serviciosIds.forEach(id => {
      const servElegido = servicios.find(s => s.id === id);
      if (servElegido) total += Number(servElegido.precio || 0);
    });
    return total;
  };

  const iniciarAlta = () => {
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
    setMostrarAlta(true);
  };

  const iniciarEdicion = (cotizacion) => {
    setEditandoId(cotizacion.id);
    setFormData({
      cantidadPersonas: cotizacion.cantidadPersonas,
      abono: cotizacion.abono,
      localId: cotizacion.localId || "",
      serviciosIds: cotizacion.cotizacionesServicios 
        ? cotizacion.cotizacionesServicios.map(cs => cs.servicioId) 
        : [],
    });
    setErrorForm(null);
    setMostrarAlta(false);
  };

  const cancelarForm = () => {
    setMostrarAlta(false);
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
      valorTotal: calcularTotal(), 
      abono: Number(formData.abono),
      serviciosIds: formData.serviciosIds, 
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
    if (!window.confirm("¿Seguro que quieres eliminar esta cotización?")) return;

    setEliminandoId(id);
    const res = await borrarCotizacion(id);

    if (res.success) {
      setCotizaciones(cotizaciones.filter((v) => v.id !== id));
      if (editandoId === id) cancelarForm();
    } else {
      alert(res.message);
    }
    setEliminandoId(null);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    const d = new Date(fecha);
    return Number.isNaN(d.getTime()) ? fecha : new Intl.DateTimeFormat("es-CL").format(d);
  };

  // Lógica de Filtros
  const cotizacionesFiltradas = cotizaciones.filter((cot) => {
    const coincideId = busquedaId.trim() === "" || String(cot.id).includes(busquedaId.trim()) || String(cot.usuarioId || "").includes(busquedaId.trim());
    const coincideEstado = filtroEstado === "todos" || (cot.estado || "pendiente").toLowerCase() === filtroEstado.toLowerCase();
    const coincideFecha = filtroFecha === "" || (cot.fecha || cot.createdAt || "").includes(filtroFecha);

    return coincideId && coincideEstado && coincideFecha;
  });

  const renderFormulario = (modo) => (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, p: 1 }}>
      <Typography variant="h6" component="h3">
        {modo === "editar" ? "Editar cotización" : "Nueva cotización"}
      </Typography>
      {errorForm && <Alert severity="error">{errorForm}</Alert>}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
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

        <FormControl size="small" fullWidth>
          <InputLabel id="servicios-label">Servicios</InputLabel>
          <Select
            labelId="servicios-label"
            multiple
            name="serviciosIds"
            value={formData.serviciosIds}
            onChange={handleChange}
            input={<OutlinedInput label="Servicios" />}
            renderValue={(selected) => `${selected.length} servicio(s) seleccionado(s)`}
          >
            {servicios.map((servicio) => (
              <MenuItem key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          label="Abono"
          name="abono"
          type="number"
          inputProps={{ min: 0, step: "any" }}
          value={formData.abono}
          onChange={handleChange}
          required
          size="small"
        />
        
        {/* Total bloqueado con cálculo automático */}
        <TextField
          label="Valor total (Calculado automático)"
          value={`$ ${calcularTotal().toLocaleString("es-CL")}`}
          size="small"
          InputProps={{
            readOnly: true,
            sx: { bgcolor: "action.hover", fontWeight: "bold" }
          }}
          tabIndex={-1}
          fullWidth
        />
      </Box>

      {formData.serviciosIds.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Servicios seleccionados:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.serviciosIds.map((id) => {
              const servicioObj = servicios.find((s) => s.id === id);
              return servicioObj ? (
                <Chip key={id} label={servicioObj.nombre} size="small" color="primary" />
              ) : null;
            })}
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" disabled={guardando}>
          {guardando ? "Guardando..." : "GUARDAR"}
        </Button>
        <Button type="button" onClick={cancelarForm} disabled={guardando}>
          CANCELAR
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h2">Cotizaciones</Typography>
          <Typography color="text.secondary">Administra las cotizaciones, estados y valores.</Typography>
        </Box>
        {!mostrarAlta && editandoId === null && (
          <Button variant="contained" onClick={iniciarAlta}>Agregar Cotización</Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Formulario de creación*/}
      {mostrarAlta && (
        <Paper variant="outlined" sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
          {renderFormulario("crear")}
        </Paper>
      )}

      {cargando ? (
        <Typography role="status">Cargando cotizaciones...</Typography>
      ) : !error && cotizaciones.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography>No existen cotizaciones registradas todavía.</Typography>
        </Paper>
      ) : !error && (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {/* Barra de Filtros (zenon no te copie guiño, guiño*/}
          <Paper variant="outlined" sx={{ px: 1.5, py: 0.5, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Filtro: {cotizacionesFiltradas.length} de {cotizaciones.length} cotizaciones
              </Typography>
              <IconButton
                onClick={() => setMostrarFiltros((actual) => !actual)}
                color={mostrarFiltros || busquedaId || filtroEstado !== "todos" || filtroFecha ? "primary" : "default"}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
            <Collapse in={mostrarFiltros}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 1.5, pb: 1.5 }}>
                <TextField
                  label="Buscar por ID de Cotización / Usuario"
                  value={busquedaId}
                  onChange={(e) => setBusquedaId(e.target.value)}
                  size="small"
                  fullWidth
                />
                <TextField
                  select
                  label="Estado"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  size="small"
                  fullWidth
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="aprobada">Aprobada</MenuItem>
                  <MenuItem value="rechazada">Rechazada</MenuItem>
                  <MenuItem value="finalizada">Finalizada</MenuItem>
                </TextField>
                <TextField
                  label="Fecha"
                  type="date"
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Collapse>
          </Paper>

          {/* Tabla de Cotizaciones */}
          {cotizacionesFiltradas.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
              <Typography>No hay cotizaciones que coincidan con los filtros.</Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflowX: "auto" }}>
              <Table aria-label="Tabla de cotizaciones">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Local</strong></TableCell>
                    <TableCell><strong>Servicios</strong></TableCell>
                    <TableCell align="center"><strong>Personas</strong></TableCell>
                    <TableCell align="right"><strong>Total / Abono</strong></TableCell>
                    <TableCell align="center"><strong>Fecha</strong></TableCell>
                    <TableCell align="center"><strong>Estado</strong></TableCell>
                    <TableCell align="right"><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cotizacionesFiltradas.map((cotizacion) => {
                    const editando = editandoId === cotizacion.id;
                    const localAsociado = locales.find((l) => l.id === cotizacion.localId) || cotizacion.local;
                    
                    let nombresServicios = "—";
                    if (cotizacion.cotizacionesServicios && cotizacion.cotizacionesServicios.length > 0) {
                      nombresServicios = cotizacion.cotizacionesServicios
                        .map(cs => cs.servicio?.nombre || servicios.find(s => s.id === cs.servicioId)?.nombre)
                        .filter(Boolean)
                        .join(", ");
                    }

                    return (
                      <TableRow key={cotizacion.id} hover>
                        {editando ? (
                          <TableCell colSpan={8}>
                            {renderFormulario("editar")}
                          </TableCell>
                        ) : (
                          <>
                            <TableCell>#{cotizacion.id}</TableCell>
                            <TableCell>{localAsociado ? localAsociado.nombre : "Sin asignar"}</TableCell>
                            <TableCell sx={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {nombresServicios}
                            </TableCell>
                            <TableCell align="center">{cotizacion.cantidadPersonas}</TableCell>
                            <TableCell align="right">
                              Total: ${cotizacion.valorTotal?.toLocaleString("es-CL")}<br/>
                              <Typography variant="caption" color="text.secondary">
                                Abono: ${cotizacion.abono?.toLocaleString("es-CL")}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{formatearFecha(cotizacion.fecha || cotizacion.createdAt)}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={cotizacion.estado || "pendiente"}
                                color={
                                  cotizacion.estado === "aprobada" ? "success" 
                                  : cotizacion.estado === "rechazada" ? "error" 
                                  : cotizacion.estado === "finalizada" ? "secondary" 
                                  : "default"
                                }
                                size="small"
                                sx={{ textTransform: "capitalize" }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button size="small" variant="outlined" onClick={() => iniciarEdicion(cotizacion)}>
                                  Editar
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                  onClick={() => handleEliminar(cotizacion.id)}
                                  disabled={eliminandoId === cotizacion.id}
                                >
                                  {eliminandoId === cotizacion.id ? "Eliminando..." : "Eliminar"}
                                </Button>
                              </Box>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
}