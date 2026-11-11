import * as React from 'react';
import Container from '@mui/material/Container';
import ProTip from './components/ProTip';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Login from './pages/Login';
import Home from './pages/Home.jsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Locales from './pages/Locales.jsx';
import Inventario from './pages/Inventario.jsx';
import Personal from './pages/Personal.jsx';
import MiniDrawer from './components/mainDrawer.jsx';
import Legal from './pages/TerminosCondiciones.jsx';
import Eventos from "./pages/Eventos.jsx";
import Cotizaciones from './pages/Cotizacion.jsx';
import Vehiculos from './pages/Vehiculos.jsx';
import UsersHome from './pages/UsersHome.jsx';
import { getHomeRoute, isRouteAllowed, isValidRole, USER_ROLES } from './auth/roles.js';
import Servicios from './pages/Servicios.jsx';

const routeFadeDuration = 180;

function ProtectedRoute({ isLoggedIn, role, allowedRoles = USER_ROLES, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getHomeRoute(role)} replace />;
  }

  return children;
}

export default function App() {
  const [role, setRole] = React.useState(() => {
    const storedRole = localStorage.getItem('role');
    return isValidRole(storedRole) ? storedRole : null;
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => Boolean(localStorage.getItem('token') && isValidRole(localStorage.getItem('role'))),
  );
  const location = useLocation();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [displayedLocation, setDisplayedLocation] = React.useState(location);
  const [fadingOut, setFadingOut] = React.useState(false);

  React.useEffect(() => {
    if (!role) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [role]);

  React.useEffect(() => {
    if (location.pathname === displayedLocation.pathname) {
      if (location.key !== displayedLocation.key) {
        setDisplayedLocation(location);
      }
      return undefined;
    }

    if (reduceMotion) {
      setDisplayedLocation(location);
      setFadingOut(false);
      return undefined;
    }

    setFadingOut(true);
    const timeoutId = window.setTimeout(() => {
      setDisplayedLocation(location);
      setFadingOut(false);
    }, routeFadeDuration);

    return () => window.clearTimeout(timeoutId);
  }, [location, displayedLocation, reduceMotion]);

  const pages = (
    <Box
      sx={{
        opacity: fadingOut ? 0 : 1,
        transition: fadingOut ? `opacity ${routeFadeDuration}ms ease-out` : 'none',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      }}
    >
      <Routes location={displayedLocation}>
        <Route
          path="/"
          element={isLoggedIn ? (
            role === 'admin' ? <Home /> : <UsersHome />
          ) : (
            <Container maxWidth="sm">
              <Box sx={{ my: 4 }}>
                <Login onLogin={(authenticatedRole) => {
                  setRole(authenticatedRole);
                  setIsLoggedIn(true);
                }} />
              </Box>
              <ProTip />
            </Container>
          )}
        />
        <Route path="/locales" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Locales />
          </ProtectedRoute>
        } />
        <Route path="/personal" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Personal />
          </ProtectedRoute>
        } />
        <Route path="/eventos" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Eventos />
          </ProtectedRoute>
        } />
        <Route path="/cotizaciones" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Cotizaciones />
          </ProtectedRoute>
        } />
        <Route path="/inventario" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Inventario />
          </ProtectedRoute>
        } />
        <Route path="/vehiculos" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
            <Vehiculos />
          </ProtectedRoute>
        } />
        <Route path="/userHome" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role}>
            <UsersHome />
          </ProtectedRoute>
        } />
        <Route path="/servicios" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
          <Servicios />
        </ProtectedRoute>
        } />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );

  if (!isLoggedIn) {
    return pages;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer
        role={role}
        onLogout={() => {
          setRole(null);
          setIsLoggedIn(false);
        }}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {pages}
      </Box>
    </Box>
  );
}