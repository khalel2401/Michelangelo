import { instance as axios } from "./rootS.js";

export async function getEventos() {
  try {
    const response = await axios.get('/eventos');
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Eventos obtenidos',
    };
  } catch (error) {
    console.error('Error al obtener eventos: ', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.mensaje || error.response?.data?.message || 'Error al obtener eventos',
    };
  }
}

export async function obtenerEventoPorId(id) {
  try {
    const response = await axios.get(`/eventos/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Evento obtenido',
    };
  } catch (error) {
    console.error('Error al obtener evento: ', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.mensaje || error.response?.data?.message || 'Error al obtener evento',
    };
  }
}

export async function crearEvento(eventoData) {
  try {
    const response = await axios.post('/eventos', eventoData);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Evento creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el evento:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.mensaje || error.response?.data?.message || 'Error al crear el evento',
    };
  }
}

export async function actualizarEvento(id, eventoData) {
  try {
    const response = await axios.put(`/eventos/${id}`, eventoData);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Evento actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el evento con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.mensaje || error.response?.data?.message || 'Error al actualizar el evento',
    };
  }
}

export async function borrarEvento(id) {
  try {
    const response = await axios.delete(`/eventos/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Evento eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el evento con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.mensaje || error.response?.data?.message || 'Error al eliminar el evento',
    };
  }
}