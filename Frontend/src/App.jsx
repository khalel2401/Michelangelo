import * as React from 'react';
import Container from '@mui/material/Container';
import ProTip from './components/ProTip';
import Box from '@mui/material/Box';
import Login from './pages/Login';
import Home from './pages/Home.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Locales from './pages/Locales.jsx';
import Inventario from './pages/Inventario.jsx';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Routes>
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
      <Route path="/Inventario" element={isLoggedIn ? <Inventario /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}