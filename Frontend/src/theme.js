import { createTheme } from '@mui/material/styles';

//Seleccion de colores para la paleta de la app.

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#1b3249',
    },
    secondary: {
      main: '#a51010',
    },
    error: {
      main: '#f71000',
    },
    warning: {
      main: '#ffc400',
    },
  },
});

export default theme;