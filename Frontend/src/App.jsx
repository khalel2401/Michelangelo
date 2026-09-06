import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './components/ProTip';
import TopTabs from './components/topTabs';


export default function App() {

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        
        {/* asi es como se pone un texto random  */}
        <Typography variant="h4" component="h1" gutterBottom>
          HOLA MUNDOS
        </Typography>
        
        {/* Aca esta la sección de tabs */}
        <TopTabs />
        
        {/* para añadir una parte a la app usar <"componente"/>   */}
        <ProTip />

        
      </Box>
    </Container>
  );
}