import { alpha } from '@mui/material/styles';

// Mismo look que eventoManager/localManager (borde carmesí + brillo al pasar el mouse).
// Si el equipo lo quiere compartir, estos dos helpers podrían moverse a src/theme/.
export const tarjetaSx = (theme) => ({
  borderRadius: 3,
  border: `1px solid ${theme.palette.brand.crimson}`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
  transition: 'box-shadow 180ms ease, transform 180ms ease',
  '&:hover': {
    boxShadow: `0 0 20px ${alpha(theme.palette.brand.crimson, 0.55)}`,
    transform: 'translateY(-4px)',
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
});

export const botonConBrillo = (color = 'primary') => (theme) => ({
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
  transition: 'box-shadow 180ms ease, transform 180ms ease',
  '&:hover:not(.Mui-disabled)': {
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
    transform: 'translateY(-2px)',
  },
});
