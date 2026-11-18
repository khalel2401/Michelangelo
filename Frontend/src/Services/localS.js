import { instance as axios } from "./rootS.js";

function mensajeDeError(error, porDefecto) {
    const data = error.response?.data;
    if (Array.isArray(data?.detalles) && data.detalles.length) {
        return data.detalles.map(({ campo, mensaje }) => `Error en ${campo}: ${mensaje}`).join('. ');
    }
    return data?.message || data?.mensaje || data?.error || porDefecto;
}

export async function getLocales(){
    try {
        const response = await axios.get('/local');
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Locales obtenidos',
        }
    } catch (error) {
        console.error('Error al obtener locales: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al obtener locales'),
        };
    }
}

export async function obtenerLocalPorId(id) {
    try {
        const response = await axios.get(`/local/${id}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Local obtenido',
        }
    } catch (error) {
        console.error('Error al obtener local: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al obtener local'),
        };
    }
}

export async function crearLocal(localData){
    try {
    const response = await axios.post('/local', localData);
        const data = response.data?.data ?? response.data;
    return {
        success: true,
            data,
            message: response.data?.message || 'Local creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el local:', error);
    return {
        success: false,
        data: null,
        message: mensajeDeError(error, 'Error al obtener local'),
    };
  }
}

export async function actualizarLocal(id, localData) {
  try {
    const response = await axios.put(`/local/${id}`, localData);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'Local actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el local con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: mensajeDeError(error, 'Error al actualizar local'),
    };
  }
}

export async function borrarLocal(id) {
  try {
    const response = await axios.delete(`/local/${id}`);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'Local eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el Local con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: mensajeDeError(error, 'Error al eliminar local'),
    };
  }
}