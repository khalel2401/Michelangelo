import { instance as axios } from "./rootS.js";

function mensajeDeError(error, porDefecto) {
    const data = error.response?.data;
    if (Array.isArray(data?.detalles) && data.detalles.length) {
        return data.detalles.map(({ campo, mensaje }) => `Error en ${campo}: ${mensaje}`).join('. ');
    }
    return data?.message || data?.mensaje || data?.error || porDefecto;
}


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
      message: mensajeDeError(error, "Error al obtener las asignaciones"),
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
      message: mensajeDeError(error, "Error al obtener los eventos"),
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
      message: mensajeDeError(error, "Error al asignar personal al evento"),
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
      message: mensajeDeError(error, "Error al quitar la asignación"),
    };
  }
}
