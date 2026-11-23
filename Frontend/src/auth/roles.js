export const USER_ROLES = ['admin', 'cliente', 'externo'];

export const ADMIN_ROUTES = [
  '/locales',
  '/personal',
  '/eventos',
  '/cotizaciones',
  '/inventario',
  '/vehiculos',
];

export const isValidRole = (role) => USER_ROLES.includes(role);

export const isRouteAllowed = (role, route) => (
  route === '/' ||
  route === '/userHome' ||
  route === '/mis-cotizaciones' ||
  (role === 'admin' && ADMIN_ROUTES.includes(route))
);

export const getHomeRoute = (role) => (role === 'admin' ? '/' : '/userHome');
