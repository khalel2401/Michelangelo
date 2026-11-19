import cookies from 'js-cookie';
// este nombre DEBE ser el mismo que rootS.js
const COOKIE = 'jwt-auth';
const USUARIO_KEY = 'usuario';

function leerPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function guardarSesion({ token, usuario }) {
  //expira en 1 hora
  cookies.set(COOKIE, token, { path: '/', expires: 1 / 24, sameSite: 'strict' });
  if (usuario) localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  else localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem('token'); // clave antigua
}

export const haySesion = () => Boolean(cookies.get(COOKIE));

export function obtenerUsuario() {
  try {
    const guardado = JSON.parse(localStorage.getItem(USUARIO_KEY));
    if (guardado) return guardado;
  } catch { /* JSON corrupto*/ }
  const payload = leerPayload(cookies.get(COOKIE) ?? '');
  return payload ? { id: payload.id, email: payload.email } : null;
}

export function cerrarSesion() {
  cookies.remove(COOKIE, { path: '/' });
  localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem('token');
}
