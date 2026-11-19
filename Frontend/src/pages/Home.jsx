import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Importamos el nuevo componente del calendario
import CalendarioEventos from '../components/calendarioEventosManager.jsx';
import FetchLocales from '../components/fetchLocales.jsx';
import { getEventos } from '../Services/eventoS.js';

export default function Home(){
  const navigate = useNavigate();
  
  // Estado para guardar los datos que trae el backend
  const [eventos, setEventos] = useState([]);

  // Cargar eventos al iniciar la página
  useEffect(() => {
    cargarEventos(); 
  }, []);

  const cargarEventos = async () => {
    try {
      const res = await getEventos();
      if (res?.success) {
        setEventos(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%', justifyContent: 'center', bgcolor: 'background.default', py: 4 }}>
      
      {/* ===================== PANEL IZQUIERDO ===================== */}
      <Container maxWidth="sm" sx={{
        border: 4,
        borderColor: 'secondary.main',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        mx: 0,
        bgcolor: 'background.paper',
      }}>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom align='center'>
            Panel de control
          </Typography>
          <Box
            component="img"
            sx={{
              display: 'block',
              mx: 'auto',
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt='imagen'
            src='../informatica.jpg' 
          />
        </Box>
        <Button onClick={() => navigate('/locales')} sx={{ alignSelf: 'center' }}>VER LOCALES</Button>
        <Button onClick={() => navigate('/inventario')} sx={{ alignSelf: 'center' }}>REVISAR INVENTARIO</Button>
        <Button onClick={() => navigate('/vehiculos')} sx={{ alignSelf: 'center' }}>REVISAR VEHICULOS</Button>
      </Container>

      {/* ===================== PANEL DERECHO (CALENDARIO Y LOCALES) ===================== */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Aquí insertamos el calendario como componente y le pasamos los eventos del backend */}
        <CalendarioEventos eventos={eventos} />

        {/* Componente extra de locales */}
        <Typography variant="h6" sx={{ mt: 2 }}>Locales</Typography>
        <FetchLocales />
      </Box>
    </Box>
  );
}