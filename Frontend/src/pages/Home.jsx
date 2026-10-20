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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%' }}>
      <Container maxWidth="sm" sx={{
        border: 4,
        borderColor: 'secondary.main',
        borderRadius: 6,
        display: 'grid',
        alignContent: 'left',
        flex: 1,
        mx: 0,
      }}>
        <Box sx={{ my: 4, align: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom align='center'>
            HOLA MUNDOS
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
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB5iy9zb2sazyZTu1udZKLhE5m8M-nJmaRvRsFLkTvFlBv0ipT4Yx5aPk&s=10'
          />
        </Box>
        <Button onClick={() => navigate('/locales')}>Ver locales</Button>
        <Button onClick={() => navigate('/inventario')}>Revisar Inventario</Button>
        <Button onClick={() => navigate('/vehiculos')}>Revisar Vehiculos</Button>
      </Container>
      <FetchLocales />
    </Box>
  );
}