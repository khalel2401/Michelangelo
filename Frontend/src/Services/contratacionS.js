import { instance as axios } from "./rootS.js";

const obtenerMensajeError = (error, mensajePredeterminado) =>
  error.response?.data?.message ||
  error.response?.data?.mensaje ||
  mensajePredeterminado;

export async function getContrataciones() {
  try {
    const response = await axios.get("/contrataciones");
    return {
      success: true,
      data: response.data?.data ?? response.data,
    };
  } catch (error) {
    console.error("Error al obtener asignaciones de personal: ", error);
    return {
      success: false,
      data: null,
      message: obtenerMensajeError(error, "Error al obtener las asignaciones"),
    };
  }
}

export async function getEventosParaAsignacion() {
  try {
    const response = await axios.get("/eventos");
    return {
      success: true,
      data: response.data?.data ?? response.data,
    };
  } catch (error) {
    console.error("Error al obtener eventos para asignar: ", error);
    return {
      success: false,
      data: null,
      message: obtenerMensajeError(error, "Error al obtener los eventos"),
    };
  }
}

export async function crearAsignacionPersonal(datos) {
  try {
    const response = await axios.post("/contrataciones", datos);
    return {
      success: true,
      data: response.data?.data ?? response.data,
    };
  } catch (error) {
    console.error("Error al asignar personal al evento: ", error);
    return {
      success: false,
      data: null,
      message: obtenerMensajeError(error, "Error al asignar personal al evento"),
    };
  }
}

export async function eliminarAsignacionPersonal(id) {
  try {
    const response = await axios.delete(`/contrataciones/${id}`);
    return {
      success: true,
      data: response.data?.data ?? response.data,
    };
  } catch (error) {
    console.error("Error al quitar asignación de personal: ", error);
    return {
      success: false,
      data: null,
      message: obtenerMensajeError(error, "Error al quitar la asignación"),
    };
  }
}
