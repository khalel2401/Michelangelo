import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  actualizarPersonal,
  crearPersonal,
  eliminarPersonal,
  getPersonales,
} from "../Services/PersonalS.js";

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

  useEffect(() => {
    cargarPersonal();
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
        {campo("calificacion", "Calificación (0 a 5)", true, campoNumero)}
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
          <Typography color="text.secondary">Administra los datos del equipo.</Typography>
        </Box>
        {!mostrarAlta && personaEditandoId === null && (
          <Button variant="contained" onClick={iniciarAlta}>Agregar personal</Button>
        )}
      </Box>

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
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table aria-label="Tabla de personal">
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Apellido</strong></TableCell>
                <TableCell><strong>Teléfono</strong></TableCell>
                <TableCell align="center"><strong>Calificación</strong></TableCell>
                <TableCell align="right"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.map((persona) => {
                const editando = personaEditandoId === persona.id;
                return (
                  <TableRow key={persona.id} hover>
                    {editando ? (
                      <TableCell colSpan={5}>
                        {formularioPersona("editar")}
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>{persona.nombre}</TableCell>
                        <TableCell>{persona.apellido}</TableCell>
                        <TableCell>{persona.telefono || "—"}</TableCell>
                        <TableCell align="center">{persona.calificacion ?? "—"}</TableCell>
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
  );
}
