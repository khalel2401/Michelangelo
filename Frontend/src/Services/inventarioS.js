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

export async function getVehiculos(){
    try {
        const response = await axios.get('/vehiculos');
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'vehiculos obtenidos',
        }
    } catch (error) {
        console.error('Error al obtener vehiculos: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener vehiculos',
        };
    }
}
export async function obtenerVehiculoPorId(id) {
    try {
        const response = await axios.get(`/vehiculos/${id}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'vehiculo obtenido',
        }
    } catch (error) {
        console.error('Error al obtener vehiculo: ', error);
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Error al obtener vehiculo',
        };
    }
}
export async function crearVehiculo(vehiculoData){
    try {
    const response = await axios.post('/vehiculos', vehiculoData);
        const data = response.data?.data ?? response.data;
    return {
        success: true,
            data,
            message: response.data?.message || 'vehiculo creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el vehiculo:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear el vehiculo',
    };
  }
}
export async function actualizarVehiculo(id, vehiculoData) {
  try {
    const response = await axios.put(`/vehiculos/${id}`, vehiculoData);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'vehiculo actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el vehiculo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al actualizar el vehiculo',
    };
  }
}
export async function borrarVehiculo(id) {
  try {
    const response = await axios.delete(`/vehiculos/${id}`);
    const data = response.data?.data ?? response.data;
    return {
        success: true,
        data,
        message: response.data?.message || 'vehiculo eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el vehiculo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar el vehiculo',
    };
  }
}