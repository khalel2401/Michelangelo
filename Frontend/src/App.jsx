import * as React from 'react';
import Container from '@mui/material/Container';
import ProTip from './components/ProTip';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Login from './pages/Login';
import Home from './pages/Home.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Locales from './pages/Locales.jsx';
import Inventario from './pages/Inventario.jsx';
import MiniDrawer from './components/mainDrawer.jsx';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const pages = (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : (
          <Container
            maxWidth="sm"
            sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Login onLogin={() => setIsLoggedIn(true)} />
            <ProTip />
          </Container>
        )}
      />
      <Route path="/locales" element={isLoggedIn ? <Locales /> : <Navigate to="/" replace />} />
      <Route path="/Inventario" element={isLoggedIn ? <Inventario /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (!isLoggedIn) {
    return pages;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {pages}
      </Box>
    </Box>
  );
}