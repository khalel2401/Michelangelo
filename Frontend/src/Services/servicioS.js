import { instance as axios } from "./rootS.js";

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
      message: error.response?.data?.message || 'Error al obtener servicios',
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
      message: error.response?.data?.message || 'Error al obtener servicio',
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
      message: error.response?.data?.message || 'Error al crear el servicio',
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
      message: error.response?.data?.message || 'Error al actualizar el servicio',
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
      message: error.response?.data?.message || 'Error al eliminar el servicio',
    };
  }
}