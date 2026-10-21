import { instance as axios } from "./rootS.js";

export async function getCotizaciones() {
  try {
    const response = await axios.get('/cotizaciones');
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Cotizaciones obtenidas',
    };
  } catch (error) {
    console.error('Error al obtener cotizaciones: ', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Error al obtener cotizaciones',
    };
  }
}

export async function obtenerCotizacionPorId(id) {
  try {
    const response = await axios.get(`/cotizaciones/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Cotización obtenida',
    };
  } catch (error) {
    console.error('Error al obtener cotización: ', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Error al obtener cotización',
    };
  }
}

export async function crearCotizacion(datosCotizacion) {
  try {
    const response = await axios.post('/cotizaciones', datosCotizacion);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Cotización creada exitosamente',
    };
  } catch (error) {
    console.error('Error al crear la cotización:', error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Error al crear la cotización',
    };
  }
}

export async function actualizarCotizacion(id, datosCotizacion) {
  try {
    const response = await axios.put(`/cotizaciones/${id}`, datosCotizacion);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Cotización actualizada exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar la cotización con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Error al actualizar la cotización',
    };
  }
}

export async function borrarCotizacion(id) {
  try {
    const response = await axios.delete(`/cotizaciones/${id}`);
    const data = response.data?.data ?? response.data;
    return {
      success: true,
      data,
      message: response.data?.message || 'Cotización eliminada exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar la cotización con ID ${id}:`, error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Error al eliminar la cotización',
    };
  }
}