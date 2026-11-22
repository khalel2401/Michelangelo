import cookies from 'js-cookie';

// OJO: este nombre DEBE ser el mismo que lee rootS.js (cookies.get('jwt-auth')).
// Antes Login guardaba el token en localStorage ("token") y rootS lo buscaba en una cookie:
// por eso ninguna petición autenticada llevaba el token.
const COOKIE = 'jwt-auth';
const USUARIO_KEY = 'usuario';

// Un JWT son 3 partes separadas por puntos; la del medio es JSON en base64. Es LEGIBLE por cualquiera:
// sirve para mostrar datos en pantalla, NUNCA para decidir seguridad (eso lo hace el backend).
function leerPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function guardarSesion({ token, usuario }) {
  // expires va en días: 1/24 = 1 hora, igual que expiresIn del JWT en el backend.
  cookies.set(COOKIE, token, { path: '/', expires: 1 / 24, sameSite: 'strict' });
  if (usuario) localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  else localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem('token'); // clave antigua
}

export const haySesion = () => Boolean(cookies.get(COOKIE));

// Devuelve { id, email, rol? }. Si el backend aún no manda el usuario en el login,
// rescatamos id y email del propio token (rol quedará undefined => se trata como cliente).
export function obtenerUsuario() {
  try {
    const guardado = JSON.parse(localStorage.getItem(USUARIO_KEY));
    if (guardado) return guardado;
  } catch { /* JSON corrupto: seguimos */ }
  const payload = leerPayload(cookies.get(COOKIE) ?? '');
  return payload ? { id: payload.id, email: payload.email } : null;
}

export function cerrarSesion() {
  cookies.remove(COOKIE, { path: '/' });
  localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem('token');
}
