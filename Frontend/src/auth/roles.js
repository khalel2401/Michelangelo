export const USER_ROLES = ['admin', 'cliente', 'externo'];

export const ADMIN_ROUTES = [
  '/locales',
  '/personal',
  '/eventos',
  '/cotizaciones',
  '/inventario',
  '/vehiculos',
  '/valoraciones'
];

export const COMMON_ROUTES = ['/', '/userHome', '/valoraciones'];

export const isValidRole = (role) => USER_ROLES.includes(role);

export const isRouteAllowed = (role, route) => (
  COMMON_ROUTES.includes(route) ||
  (role === 'admin' && ADMIN_ROUTES.includes(route))
);

export const getHomeRoute = (role) => (role === 'admin' ? '/' : '/userHome');
