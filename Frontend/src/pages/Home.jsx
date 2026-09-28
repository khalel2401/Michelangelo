import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function Home(){
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        
        <Typography variant="h4" component="h1" gutterBottom>
          HOLA MUNDOS
        </Typography>
        
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt='gato'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB5iy9zb2sazyZTu1udZKLhE5m8M-nJmaRvRsFLkTvFlBv0ipT4Yx5aPk&s=10'
        />

      </Box>
    </Container>
  );
}