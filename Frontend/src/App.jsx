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

const routeFadeDuration = 180;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => Boolean(localStorage.getItem('token')),
  );
  const location = useLocation();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [displayedLocation, setDisplayedLocation] = React.useState(location);
  const [fadingOut, setFadingOut] = React.useState(false);

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
          element={isLoggedIn ? <Home /> : (
            <Container maxWidth="sm">
              <Box sx={{ my: 4 }}>
                <Login onLogin={() => setIsLoggedIn(true)} />
              </Box>
              <ProTip />
            </Container>
          )}
        />
        <Route path="/locales" element={isLoggedIn ? <Locales /> : <Navigate to="/" replace />} />
        <Route path="/personal" element={isLoggedIn ? <Personal /> : <Navigate to="/" replace />} />
        <Route path="/eventos" element={isLoggedIn ? <Eventos /> : <Navigate to="/" replace />} />
        <Route path="/cotizaciones" element={isLoggedIn ? <Cotizaciones /> : <Navigate to="/" replace />} />
        <Route path="/inventario" element={isLoggedIn ? <Inventario /> : <Navigate to="/" replace />} />
        <Route path="/vehiculos" element={isLoggedIn ? <Vehiculos /> : <Navigate to="/" replace />} />
        <Route path="/userHome" element={isLoggedIn ? <UsersHome /> : <Navigate to="/" replace />}/>
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
      <MiniDrawer onLogout={() => setIsLoggedIn(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {pages}
      </Box>
    </Box>
  );
}