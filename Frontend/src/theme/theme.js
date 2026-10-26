import { createTheme } from '@mui/material/styles';

const brandPalette = {
  brand: {
    crimson: '#DC143C',
    crimsonDark: '#B5123B',
    burgundy: '#7B102C',
    appBar: '#9B1235',
    onAppBar: '#FFFFFF',
  },
};

const theme = createTheme({
  cssVariables: true,
  colorSchemeSelector: 'class',
  colorSchemes: {
    light: {
      palette: {
        ...brandPalette,
        primary: {
          main: '#073c70',
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
        background: {
          default: '#ededed',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        ...brandPalette,
        primary: {
          main: '#073c70',
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
        background: {
          default: '#000000',
          paper: '#101010',
        },
      },
    },
  },
});

export default theme;