import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import {
  actualizarPersonal,
  crearPersonal,
  eliminarPersonal,
  getPersonales,
} from "../Services/PersonalS.js";
import {
  crearAsignacionPersonal,
  eliminarAsignacionPersonal,
  getContrataciones,
  getEventosParaAsignacion,
} from "../Services/contratacionS.js";

const personaVacia = {
  nombre: "",
  apellido: "",
  telefono: "",
  calificacion: "0",
};

const campoNumero = {
  type: "number",
  inputProps: { min: 0, max: 5, step: 1 },
};

export default function PersonalManager() {
  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState(null);
  const [personaEditandoId, setPersonaEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(personaVacia);
  const [mostrarAlta, setMostrarAlta] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [pestana, setPestana] = useState(0);
  const [busquedaPersonal, setBusquedaPersonal] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroAsignacion, setFiltroAsignacion] = useState("todos");
  const [eventos, setEventos] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [cargandoAsignaciones, setCargandoAsignaciones] = useState(true);
  const [errorAsignaciones, setErrorAsignaciones] = useState(null);
  const [errorFormularioAsignacion, setErrorFormularioAsignacion] = useState(null);
  const [asignacion, setAsignacion] = useState({
    idPersonal: "",
    idEvento: "",
    fechaContratacion: "",
    salario: "",
  });
  const [guardandoAsignacion, setGuardandoAsignacion] = useState(false);
  const [eliminandoAsignacionId, setEliminandoAsignacionId] = useState(null);

  useEffect(() => {
    cargarPersonal();
    cargarAsignaciones();
  }, []);

  const cargarPersonal = async () => {
    setCargando(true);
    setError(null);

    try {
      const resultado = await getPersonales();
      if (!resultado.success) {
        throw new Error(resultado.message);
      }
      setPersonas(Array.isArray(resultado.data) ? resultado.data : []);
    } catch (err) {
      setError(err.message || "No se pudo cargar el personal");
    } finally {
      setCargando(false);
    }
  };

  const cargarAsignaciones = async () => {
    setCargandoAsignaciones(true);
    setErrorAsignaciones(null);

    const [resultadoAsignaciones, resultadoEventos] = await Promise.all([
      getContrataciones(),
      getEventosParaAsignacion(),
    ]);

    if (!resultadoAsignaciones.success || !resultadoEventos.success) {
      setErrorAsignaciones(
        resultadoAsignaciones.message ||
          resultadoEventos.message ||
          "No se pudieron cargar las asignaciones",
      );
    } else {
      setAsignaciones(Array.isArray(resultadoAsignaciones.data) ? resultadoAsignaciones.data : []);
      setEventos(Array.isArray(resultadoEventos.data) ? resultadoEventos.data : []);
    }
    setCargandoAsignaciones(false);
  };

  const cambiarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  };

  const iniciarEdicion = (persona) => {
    setFormulario({
      nombre: persona.nombre ?? "",
      apellido: persona.apellido ?? "",
      telefono: persona.telefono ?? "",
      calificacion: String(persona.calificacion ?? 0),
    });
    setPersonaEditandoId(persona.id);
    setErrorFormulario(null);
    setMostrarAlta(false);
  };

  const cancelarEdicion = () => {
    setPersonaEditandoId(null);
    setFormulario(personaVacia);
    setErrorFormulario(null);
  };

  const iniciarAlta = () => {
    cancelarEdicion();
    setMostrarAlta(true);
  };

  const cancelarAlta = () => {
    setMostrarAlta(false);
    setFormulario(personaVacia);
    setErrorFormulario(null);
  };

  const guardarPersona = async (event) => {
    event.preventDefault();
    setGuardando(true);
    setErrorFormulario(null);

    const datos = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      calificacion: Number(formulario.calificacion),
      ...(formulario.telefono.trim() ? { telefono: formulario.telefono.trim() } : {}),
    };

    try {
      const resultado = personaEditandoId
        ? await actualizarPersonal(personaEditandoId, datos)
        : await crearPersonal(datos);

      if (!resultado.success) {
        throw new Error(resultado.message);
      }

      if (personaEditandoId) {
        setPersonas((actuales) =>
          actuales.map((persona) =>
            persona.id === personaEditandoId ? resultado.data : persona,
          ),
        );
        cancelarEdicion();
      } else {
        setPersonas((actuales) => [...actuales, resultado.data]);
        cancelarAlta();
      }
    } catch (err) {
      setErrorFormulario(err.message || "No se pudo guardar el personal");
    } finally {
      setGuardando(false);
    }
  };

  const borrarPersona = async (persona) => {
    if (!window.confirm(`¿Seguro que quieres eliminar a ${persona.nombre} ${persona.apellido}?`)) {
      return;
    }

    setEliminandoId(persona.id);
    const resultado = await eliminarPersonal(persona.id);
    if (resultado.success) {
      setPersonas((actuales) => actuales.filter((item) => item.id !== persona.id));
      if (personaEditandoId === persona.id) {
        cancelarEdicion();
      }
    } else {
      setError(resultado.message || "No se pudo eliminar el personal");
    }
    setEliminandoId(null);
  };

  const cambiarAsignacion = (event) => {
    const { name, value } = event.target;
    setAsignacion((actual) => ({ ...actual, [name]: value }));
    setErrorFormularioAsignacion(null);
  };

  const guardarAsignacion = async (event) => {
    event.preventDefault();
    setGuardandoAsignacion(true);
    setErrorFormularioAsignacion(null);

    const yaAsignado = asignaciones.some(
      (item) =>
        String(item.id_personal ?? item.personal?.id) === asignacion.idPersonal &&
        String(item.id_evento ?? item.evento?.id) === asignacion.idEvento,
    );
    if (yaAsignado) {
      setErrorFormularioAsignacion("Este personal ya está asignado a ese evento.");
      setGuardandoAsignacion(false);
      return;
    }

    const datos = {
      idPersonal: Number(asignacion.idPersonal),
      idEvento: Number(asignacion.idEvento),
      salario: Number(asignacion.salario),
      ...(asignacion.fechaContratacion
        ? { fechaContratacion: asignacion.fechaContratacion }
        : {}),
    };

    const resultado = await crearAsignacionPersonal(datos);
    if (resultado.success) {
      setAsignaciones((actuales) => [...actuales, resultado.data]);
      setAsignacion({
        idPersonal: "",
        idEvento: "",
        fechaContratacion: "",
        salario: "",
      });
    } else {
      setErrorFormularioAsignacion(
        resultado.message || "No se pudo asignar el personal al evento",
      );
    }
    setGuardandoAsignacion(false);
  };

  const quitarAsignacion = async (item) => {
    if (
      !window.confirm(
        `¿Quieres quitar a ${item.personal?.nombre || "este personal"} del evento "${item.evento?.local || "seleccionado"}"?`,
      )
    ) {
      return;
    }

    setEliminandoAsignacionId(item.id);
    const resultado = await eliminarAsignacionPersonal(item.id);
    if (resultado.success) {
      setAsignaciones((actuales) => actuales.filter((asignacionActual) => asignacionActual.id !== item.id));
    } else {
      setErrorAsignaciones(resultado.message || "No se pudo quitar la asignación");
    }
    setEliminandoAsignacionId(null);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    const fechaLocal = new Date(`${String(fecha).slice(0, 10)}T00:00:00`);
    return Number.isNaN(fechaLocal.getTime())
      ? fecha
      : new Intl.DateTimeFormat("es-CL", { dateStyle: "medium" }).format(fechaLocal);
  };

  const campo = (name, label, required = true, extra = {}) => (
    <TextField
      label={label}
      name={name}
      value={formulario[name]}
      onChange={cambiarCampo}
      required={required}
      size="small"
      fullWidth
      {...extra}
    />
  );

  const personasFiltradas = personas.filter((persona) => {
    const coincideNombre = (persona.nombre ?? "")
      .toLocaleLowerCase("es")
      .includes(busquedaPersonal.trim().toLocaleLowerCase("es"));
    const estaAsignado = asignaciones.some(
      (item) => String(item.id_personal ?? item.personal?.id) === String(persona.id),
    );
    const coincideAsignacion =
      cargandoAsignaciones ||
      Boolean(errorAsignaciones) ||
      filtroAsignacion === "todos" ||
      (filtroAsignacion === "asignados" && estaAsignado) ||
      (filtroAsignacion === "sin-asignar" && !estaAsignado);

    return coincideNombre && coincideAsignacion;
  });

  const formularioPersona = (modo) => (
    <Box component="form" onSubmit={guardarPersona} sx={{ display: "grid", gap: 1.5 }}>
      <Typography variant="h6" component="h3">
        {modo === "editar" ? "Editar personal" : "Agregar personal"}
      </Typography>
      {errorFormulario && <Alert severity="error">{errorFormulario}</Alert>}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 1.5 }}>
        {campo("nombre", "Nombre")}
        {campo("apellido", "Apellido")}
        {campo("telefono", "Teléfono", false, { inputProps: { maxLength: 16 } })}
        {campo("calificacion", "Calificación (0 a 5)[TEMPORAL]", true, campoNumero)}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </Button>
        <Button type="button" onClick={modo === "editar" ? cancelarEdicion : cancelarAlta} disabled={guardando}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h2">Personal</Typography>
          <Typography color="text.secondary">Administra el equipo y sus eventos asignados.</Typography>
        </Box>
        {pestana === 0 && !mostrarAlta && personaEditandoId === null && (
          <Button variant="contained" onClick={iniciarAlta}>Agregar personal</Button>
        )}
      </Box>

      <Tabs
        value={pestana}
        onChange={(_event, valor) => setPestana(valor)}
        aria-label="Administración de personal y asignaciones"
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Personal" />
        <Tab label="Asignaciones a eventos" />
      </Tabs>

      {pestana === 0 && (
        <>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {mostrarAlta && (
            <Paper variant="outlined" sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
              {formularioPersona("crear")}
            </Paper>
          )}

          {cargando ? (
            <Typography role="status">Cargando personal...</Typography>
          ) : !error && personas.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography>No hay personal registrado todavía.</Typography>
            </Paper>
          ) : !error && (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Paper
                variant="outlined"
                sx={{ px: 1.5, py: 0.5, borderRadius: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Filtro: {personasFiltradas.length} de {personas.length} personas
                  </Typography>
                  <IconButton
                    aria-label={mostrarFiltros ? "Ocultar filtros de personal" : "Mostrar filtros de personal"}
                    aria-expanded={mostrarFiltros}
                    onClick={() => setMostrarFiltros((actual) => !actual)}
                    color={mostrarFiltros || busquedaPersonal || filtroAsignacion !== "todos" ? "primary" : "default"}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Box>
                <Collapse in={mostrarFiltros}>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.5, pb: 1.5 }}>
                    <TextField
                      label="Buscar por nombre"
                      value={busquedaPersonal}
                      onChange={(event) => setBusquedaPersonal(event.target.value)}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      select
                      label="Asignación a evento"
                      value={filtroAsignacion}
                      onChange={(event) => setFiltroAsignacion(event.target.value)}
                      size="small"
                      fullWidth
                      disabled={cargandoAsignaciones || Boolean(errorAsignaciones)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="asignados">Asignados a un evento</MenuItem>
                      <MenuItem value="sin-asignar">Sin asignación</MenuItem>
                    </TextField>
                  </Box>
                </Collapse>
              </Paper>
              {personasFiltradas.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                  <Typography>No hay personal que coincida con los filtros.</Typography>
                </Paper>
              ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflowX: "auto" }}>
                  <Table aria-label="Tabla de personal">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Apellido</strong></TableCell>
                        <TableCell><strong>Teléfono</strong></TableCell>
                        <TableCell align="center"><strong>Calificación</strong></TableCell>
                        <TableCell><strong>Evento asignado</strong></TableCell>
                        <TableCell align="right"><strong>Acciones</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {personasFiltradas.map((persona) => {
                        const editando = personaEditandoId === persona.id;
                        const asignacionesPersona = asignaciones.filter(
                          (item) =>
                            String(item.id_personal ?? item.personal?.id) === String(persona.id),
                        );
                        return (
                          <TableRow key={persona.id} hover>
                            {editando ? (
                              <TableCell colSpan={6}>
                                {formularioPersona("editar")}
                              </TableCell>
                            ) : (
                              <>
                                <TableCell>{persona.nombre}</TableCell>
                                <TableCell>{persona.apellido}</TableCell>
                                <TableCell>{persona.telefono || "—"}</TableCell>
                                <TableCell align="center">{persona.calificacion ?? "—"}</TableCell>
                                <TableCell>
                                  {cargandoAsignaciones
                                    ? "Cargando asignaciones..."
                                    : errorAsignaciones
                                      ? "No disponible"
                                      : asignacionesPersona.length === 0
                                        ? "Sin asignación"
                                        : asignacionesPersona.map((item) => {
                                          const evento = item.evento || eventos.find(
                                            (actual) =>
                                              String(actual.id) ===
                                              String(item.id_evento ?? item.evento?.id),
                                          );
                                          return (
                                            <Typography key={item.id} variant="body2">
                                              {evento?.nombre || evento?.local || "Evento no disponible"}
                                              {evento?.fecha && ` · ${formatearFecha(evento.fecha)}`}
                                            </Typography>
                                          );
                                        })}
                                </TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button size="small" variant="outlined" onClick={() => iniciarEdicion(persona)}>
                                      Editar
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      variant="outlined"
                                      onClick={() => borrarPersona(persona)}
                                      disabled={eliminandoId === persona.id}
                                    >
                                      {eliminandoId === persona.id ? "Eliminando..." : "Eliminar"}
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
        </>
      )}

      {pestana === 1 && (
        <Box sx={{ display: "grid", gap: 2 }}>
          {errorAsignaciones && (
            <Alert
              severity="error"
              action={<Button color="inherit" size="small" onClick={cargarAsignaciones}>Reintentar</Button>}
            >
              {errorAsignaciones}
            </Alert>
          )}
          <Paper
            component="form"
            variant="outlined"
            onSubmit={guardarAsignacion}
            sx={{ p: 2.5, borderRadius: 2 }}
          >
            <Typography variant="h6" component="h3" gutterBottom>
              Asignar personal a un evento
            </Typography>
            {errorFormularioAsignacion && (
              <Alert severity="error" sx={{ mb: 2 }}>{errorFormularioAsignacion}</Alert>
            )}
            {(personas.length === 0 || eventos.length === 0) && !cargandoAsignaciones && !errorAsignaciones && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Para crear una asignación, primero registra personal y al menos un evento.
              </Alert>
            )}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 1.5 }}>
              <TextField
                select
                label="Personal"
                name="idPersonal"
                value={asignacion.idPersonal}
                onChange={cambiarAsignacion}
                required
                size="small"
                disabled={personas.length === 0}
              >
                {personas.map((persona) => (
                  <MenuItem key={persona.id} value={String(persona.id)}>
                    {persona.nombre} {persona.apellido}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Evento"
                name="idEvento"
                value={asignacion.idEvento}
                onChange={cambiarAsignacion}
                required
                size="small"
                disabled={eventos.length === 0}
              >
                {eventos.map((evento) => {
                  const duplicado = asignaciones.some(
                    (item) =>
                      String(item.id_personal ?? item.personal?.id) === asignacion.idPersonal &&
                      String(item.id_evento ?? item.evento?.id) === String(evento.id),
                  );
                  return (
                    <MenuItem key={evento.id} value={String(evento.id)} disabled={duplicado}>
                      {evento.local} · {formatearFecha(evento.fecha)}{duplicado ? " (ya asignado)" : ""}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                label="Fecha de asignación"
                name="fechaContratacion"
                type="date"
                value={asignacion.fechaContratacion}
                onChange={cambiarAsignacion}
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Salario"
                name="salario"
                type="number"
                value={asignacion.salario}
                onChange={cambiarAsignacion}
                required
                size="small"
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1.5 }}
              disabled={
                guardandoAsignacion ||
                cargandoAsignaciones ||
                personas.length === 0 ||
                eventos.length === 0
              }
            >
              {guardandoAsignacion ? "Asignando..." : "Asignar a evento"}
            </Button>
          </Paper>

          {cargandoAsignaciones ? (
            <Typography role="status">Cargando asignaciones...</Typography>
          ) : !errorAsignaciones && asignaciones.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography>Aún no hay personal asignado a eventos.</Typography>
            </Paper>
          ) : !errorAsignaciones && (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, overflowX: "auto" }}>
              <Table aria-label="Asignaciones de personal a eventos">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Personal</strong></TableCell>
                    <TableCell><strong>Evento</strong></TableCell>
                    <TableCell><strong>Fecha del evento</strong></TableCell>
                    <TableCell><strong>Fecha de asignación</strong></TableCell>
                    <TableCell align="right"><strong>Salario</strong></TableCell>
                    <TableCell align="right"><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asignaciones.map((item) => {
                    const persona = item.personal || personas.find(
                      (actual) => String(actual.id) === String(item.id_personal),
                    );
                    const evento = item.evento || eventos.find(
                      (actual) => String(actual.id) === String(item.id_evento),
                    );
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell>{persona ? `${persona.nombre} ${persona.apellido}` : "Personal no disponible"}</TableCell>
                        <TableCell>{evento?.local || "Evento no disponible"}</TableCell>
                        <TableCell>{formatearFecha(evento?.fecha)}</TableCell>
                        <TableCell>{formatearFecha(item.fecha)}</TableCell>
                        <TableCell align="right">{item.salario ?? "—"}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => quitarAsignacion(item)}
                            disabled={eliminandoAsignacionId === item.id}
                          >
                            {eliminandoAsignacionId === item.id ? "Quitando..." : "Quitar"}
                          </Button>
                        </TableCell>
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
