import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FetchLocales from '../components/fetchLocales.jsx';


export default function Home(){
  const navigate = useNavigate();
  console.log('Home.jsx renderizado');
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%', justifyContent: 'center', bgcolor: 'background.default', py: 4 }}>
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
            alt='gato'
            src='../informatica.jpg'
          />
        </Box>
        <Button onClick={() => navigate('/locales')} sx={{ alignSelf: 'center' }}>Ver locales</Button>
        <Button onClick={() => navigate('/inventario')} sx={{ alignSelf: 'center' }}>Revisar Inventario</Button>
        <Button onClick={() => navigate('/vehiculos')} sx={{ alignSelf: 'center' }}>Revisar Vehiculos</Button>
      </Container>
      <FetchLocales />
    </Box>
  );
}