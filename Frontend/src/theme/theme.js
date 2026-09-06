import { createTheme } from '@mui/material/styles';

//Seleccion de colores para la paleta de la app.
//Ajustar Bien los colores dependiendo del tema seleccionado PORFAVOR
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
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
    },
    dark: {
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
    },
  },
});

export default theme;