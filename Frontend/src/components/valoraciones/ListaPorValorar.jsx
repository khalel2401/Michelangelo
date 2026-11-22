import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tarjetaSx, botonConBrillo } from './estilos.js';

// Componente GENÉRICO: sirve para eventos y para trabajadores porque no sabe qué son.
// Recibe items = [{ id, titulo, subtitulo }] y avisa con onValorar(item).
export default function ListaPorValorar({ items, vacio, onValorar }) {
  if (items.length === 0) {
    return <Typography align="center" color="text.secondary">{vacio}</Typography>;
  }
  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 700, mx: 'auto' }}>
      {items.map((item) => (
        <Card key={item.id} variant="outlined" sx={tarjetaSx}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography variant="h6" component="h3">{item.titulo}</Typography>
              {item.subtitulo && <Typography variant="body2" color="text.secondary">{item.subtitulo}</Typography>}
            </Box>
            <Button variant="contained" onClick={() => onValorar(item)} sx={botonConBrillo()}>
              Valorar
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
