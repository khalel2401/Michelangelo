import axios from "./rootS.js";

export async function getLocales(){
    try {
        const response = await axios.get('/local');
        return {
            success: true,
            data: response.data.data,
            message: response.data.message || 'Locales obtenidos',
        }
    } catch (error) {
        console.error('Error al obtener locales: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener locales',
        };
    }
}

export async function obtenerLocalPorId(id) {
    try {
        const response = await axios.get(`/local/${id}`);
        return {
            success: true,
            data: response.data.data,
            message: response.data.message || 'Local obtenido',
        }
    } catch (error) {
        console.error('Error al obtener local: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener local',
        };
    }
}

export async function crearLocal(localData){
    try {
    const response = await axios.post('/local', localData);
    return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Local creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el local:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear el local',
    };
  }
}

export async function actualizarLocal(id, localData) {
  try {
    const response = await axios.patch(`/local/${id}`, localData);
    return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Local actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el local con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al actualizar el local',
    };
  }
}

export async function borrarLocal(id) {
  try {
    const response = await axios.delete(`/local/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Local eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el Local con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar el local',
    };
  }
}