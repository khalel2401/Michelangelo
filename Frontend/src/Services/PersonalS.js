import {instance as axios } from "./rootS.js";

function mensajeDeError(error, porDefecto) {
    const data = error.response?.data;
    if (Array.isArray(data?.detalles) && data.detalles.length) {
        return data.detalles.map(({ campo, mensaje }) => `Error en ${campo}: ${mensaje}`).join('. ');
    }
    return data?.message || data?.mensaje || data?.error || porDefecto;
}

export async function getPersonales(){
    try {
        const response = await axios.get('/personas');
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Personales obtenidos',
        }
    } catch (error) {
        console.error('Error al obtener personales: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al obtener personales'),
        };
    }
}

export async function obtenerPersonalPorNombre(nombre) {
    try {
        const response = await axios.get(`/personas/nombre/${encodeURIComponent(nombre)}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Personal obtenido',
        }
    } catch (error) {
        console.error('Error al obtener personal: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al obtener persona'),
        };
    }
}

export async function obtenerPersonalPorId(id) {
    try {
        const response = await axios.get(`/personas/${id}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Personal obtenido',
        }
    } catch (error) {
        console.error('Error al obtener personal: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al obtener Personal'),
        };
    }
}

export async function crearPersonal(personalData){
    try {
        const response = await axios.post('/personas', personalData);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data
        }
    } catch (error) {
        console.error('Error al crear personal: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al crear Personal'),
        };
    }
}

export async function actualizarPersonal(id, personalData) {
    try {
        const response = await axios.put(`/personas/${id}`, personalData);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Personal actualizado',
        }
    } catch (error) {
        console.error('Error al actualizar personal: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al actualizar Personal'),
        };
    }
}

export async function eliminarPersonal(id) {
    try {
        const response = await axios.delete(`/personas/${id}`);
        const data = response.data?.data ?? response.data;
        return {
            success: true,
            data,
            message: response.data?.message || 'Personal eliminado',
        }
    } catch (error) {
        console.error('Error al eliminar personal: ', error);
        return {
            success: false,
            data: null,
            message: mensajeDeError(error, 'Error al eliminar Personal'),
        };
    }
}