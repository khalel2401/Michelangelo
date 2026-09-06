import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';


export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        
        <Typography variant="h4" component="h1" gutterBottom>
          HOLA MUNDO
        </Typography>
        {/* para añadir una parte a la app usar <"componente"/>   */}
        <ProTip />

      </Box>
    </Container>
  );
}