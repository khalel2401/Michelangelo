import { instance as axios } from "./rootS.js";

export async function getArticulos(){
    try {
        const response = await axios.get('/articulos');
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'articulos obtenidos',
        }
    } catch (error) {
        console.error('Error al obtener articulos: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener articulos',
        };
    }
}
export async function obtenerArticuloPorId(id) {
    try {
        const response = await axios.get(`/articulos/${id}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'articulo obtenido',
        }
    } catch (error) {
        console.error('Error al obtener articulo: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener articulo',
        };
    }
}
export async function crearArticulos(articuloData){
    try {
    const response = await axios.post('/articulos', articuloData);
        const data = response.data?.data ?? response.data;
    return {
        success: true,
            data,
            message: response.data?.message || 'articulo creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el articulo:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear el articulo',
    };
  }
}
export async function actualizarArticulos(id, articuloData) {
  try {
    const response = await axios.put(`/articulos/${id}`, articuloData);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'articulo actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el articulo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al actualizar el articulo',
    };
  }
}
export async function borrarArticulos(id) {
  try {
    const response = await axios.delete(`/articulos/${id}`);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'articulo eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el articulo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar el articulo',
    };
  }
}