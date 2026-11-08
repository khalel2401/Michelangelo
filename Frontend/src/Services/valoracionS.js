import { instance as axios } from './rootS.js';

// Tu backend de valoraciones responde errores en 3 formatos distintos:
//   { message }                          -> valoracionC.js
//   { error }                            -> errorM.js
//   { error, detalles:[{campo,mensaje}]} -> validarM.js (zod)
// Esta función los convierte en UN texto legible para mostrar en pantalla.
function mensajeDeError(error, porDefecto) {
  const d = error.response?.data;
  if (Array.isArray(d?.detalles) && d.detalles.length) {
    return d.detalles.map((x) => x.mensaje).join('. ');
  }
  return d?.message || d?.mensaje || d?.error || porDefecto;
}

// Mismo "contrato" que usan eventoS.js y localS.js: siempre devuelve { success, data, message }.
// La diferencia es que el try/catch vive UNA vez aquí, en vez de repetirse en cada función.
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
      status, // extra: permite a la pantalla distinguir 401 (sesión vencida), 403, etc.
      message: status === 401
        ? 'Tu sesión expiró. Vuelve a iniciar sesión.'
        : mensajeDeError(error, mensajeError),
    };
  }
}

export const getMisValoraciones = () =>
  llamar(() => axios.get('/valoraciones/misValoraciones'), 'Valoraciones obtenidas', 'Error al obtener tus valoraciones');

export const getTrabajadores = () =>
  llamar(() => axios.get('/valoraciones/trabajadores'), 'Trabajadores obtenidos', 'Error al obtener los trabajadores');

// datos = { calificacion, comentario?, eventoId }  ó  { calificacion, comentario?, trabajadorId }
export const crearValoracion = (datos) =>
  llamar(() => axios.post('/valoraciones', datos), 'Valoración creada', 'Error al crear la valoración');

export const actualizarValoracion = (id, datos) =>
  llamar(() => axios.put(`/valoraciones/${id}`, datos), 'Valoración actualizada', 'Error al actualizar la valoración');

export const borrarValoracion = (id) =>
  llamar(() => axios.delete(`/valoraciones/${id}`), 'Valoración eliminada', 'Error al eliminar la valoración');

// Solo admin (el backend responde 403 al resto):
export const getResumenEvento = (id) =>
  llamar(() => axios.get(`/valoraciones/eventos/${id}`), 'Resumen obtenido', 'Error al obtener el resumen del evento');

export const getResumenTrabajador = (id) =>
  llamar(() => axios.get(`/valoraciones/trabajadores/${id}`), 'Resumen obtenido', 'Error al obtener el resumen del trabajador');
