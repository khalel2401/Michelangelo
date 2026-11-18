import { instance as axios } from "./rootS.js";

function mensajeDeError(error, porDefecto) {
    const data = error.response?.data;
    if (Array.isArray(data?.detalles) && data.detalles.length) {
        return data.detalles.map(({ campo, mensaje }) => `Error en ${campo}: ${mensaje}`).join('. ');
    }
    return data?.message || data?.mensaje || data?.error || porDefecto;
}

export async function getServicios() {
  try {
    const response = await axios.get('/servicios');
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Servicios obtenidos',
    };
  } catch (error) {
    console.error('Error al obtener servicios: ', error);
    return {
      success: false,
      data: null,
      message: mensajeDeError(error, 'Error al obtener servicios'),
    };
  }
}

export async function obtenerServicioPorId(id) {
  try {
    const response = await axios.get(`/servicios/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Servicio obtenido',
    };
  } catch (error) {
    console.error('Error al obtener servicio: ', error);
    return {
      success: false,
      data: null,
      message: mensajeDeError(error, 'Error al obtener servicio'),
    };
  }
}

export async function crearServicio(servicioData) {
  try {
    const response = await axios.post('/servicios', servicioData);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Servicio creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    return {
      success: false,
      data: null,
      message: mensajeDeError(error, 'Error al crear servicio'),
    };
  }
}

export async function actualizarServicio(id, servicioData) {
  try {
    const response = await axios.put(`/servicios/${id}`, servicioData);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Servicio actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: mensajeDeError(error, 'Error al actualizar servicio'),
    };
  }
}

export async function borrarServicio(id) {
  try {
    const response = await axios.delete(`/servicios/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Servicio eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: mensajeDeError(error, 'Error al eliminar servicio'),
    };
  }
}