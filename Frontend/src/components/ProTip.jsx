import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

export default function ProTip() {
  let tip = 'ERROR';
  switch (Math.floor(Math.random() * 11) + 1){ //genera un numero aleatorio para elegir entre distintos tips
    case 1:
      tip = 'Pone bien tu contraseña.';
      break;
    case 2:
      tip = 'Las mayusculas existen.';
      break;
    case 3:
      tip = 'No mires a dios a los ojos.';
      break;
    case 4:
      tip = 'No busques conocimiento de algo que tu cabeza no pueda comprender.';
      break;
    case 5:
      tip = 'Lo malo de ser mas rapido que la luz, es que solo vivirás en la oscuridad.';
      break;
    case 6:
      tip = 'Teme a la vieja sangre.';
      break;
    case 7:
      tip = 'Alabado sea el sol.';
      break;
    case 8:
      tip = 'El loco que no pertenece a esta era, el misterioso gobernante sobre la niebla gris, el rey del amarillo y el negro que ejerce la buena suerte.';
      break;
    case 9:
      tip = 'Quien tiene un porqué para vivir puede soportar casi cualquier cómo.';
      break;
    case 10:
      tip = 'Cuando no estas parado, definitivamente estas sentado';
      break;
    case 11:
      tip = '¡Ajustate el wiimote en la muñeca para evitar accidentes!';
      break;
    default:
      tip = 'ERROR DE RANDOM';
      break;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" gutterBottom sx={{ mt: 1, mb: 2, color: 'text.secondary', fontSize: '1rem', textAlign: 'center' }}>
        <LightBulbIcon sx={{ mr: 1, verticalAlign: 'middle', align: 'center' }} />
        Consejo: {tip}
      </Typography>
    </Box>
  );
}