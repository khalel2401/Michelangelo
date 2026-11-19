import { instance as axios } from './rootS.js';

function mensajeDeError(error, porDefecto) {
  const d = error.response?.data;
  if (Array.isArray(d?.detalles) && d.detalles.length) {
    return d.detalles.map((x) => x.mensaje).join('. ');
  }
  return d?.message || d?.mensaje || d?.error || porDefecto;
}

async function llamar(peticion, mensajeOk, mensajeError) {
  try {
    const response = await peticion();
    const data = response.data?.data ?? response.data;
    return { success: true, data, message: response.data?.message || mensajeOk };
  } catch (error) {
    console.error(mensajeError, error);
    const status = error.response?.status ?? 0;
    return {
      success: false,
      data: null,
      status,
      message: status === 401
        ? 'Tu sesión expiró. Vuelve a iniciar sesión.'
        : mensajeDeError(error, mensajeError),
    };
  }
}

// Solo admin ve todas las valoraciones de todos los usuarios.
export const getTodasValoraciones = () =>
  llamar(() => axios.get('/valoraciones'), 'Valoraciones obtenidas', 'Error al obtener las valoraciones');

export const getMisValoraciones = () =>
  llamar(() => axios.get('/valoraciones/misValoraciones'), 'Valoraciones obtenidas', 'Error al obtener tus valoraciones');

export const getTrabajadores = () =>
  llamar(() => axios.get('/valoraciones/trabajadores'), 'Trabajadores obtenidos', 'Error al obtener los trabajadores');
 
export const crearValoracion = (datos) =>
  llamar(() => axios.post('/valoraciones', datos), 'Valoración creada', 'Error al crear la valoración');

export const actualizarValoracion = (id, datos) =>
  llamar(() => axios.put(`/valoraciones/${id}`, datos), 'Valoración actualizada', 'Error al actualizar la valoración');

export const borrarValoracion = (id) =>
  llamar(() => axios.delete(`/valoraciones/${id}`), 'Valoración eliminada', 'Error al eliminar la valoración');

export const getResumenEvento = (id) =>
  llamar(() => axios.get(`/valoraciones/eventos/${id}`), 'Resumen obtenido', 'Error al obtener el resumen del evento');

export const getResumenTrabajador = (id) =>
  llamar(() => axios.get(`/valoraciones/trabajadores/${id}`), 'Resumen obtenido', 'Error al obtener el resumen del trabajador');


//HACER DESPUES LA VALIDACION QUE EL COMENTARIO TENGA UN MINIMO DE PALABRAS PARA QUE NO SEA DEMACIADO CORTO 
