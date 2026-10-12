import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { getLocales } from '../Services/localS.js';

export default function FetchLocales() {
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    const cargarLocales = async () => {
      try {
        const resultado = await getLocales();
        if (!resultado.success) {
          throw new Error(resultado.message);
        }
        if (!Array.isArray(resultado.data)) {
          throw new Error('La respuesta de locales no tiene un formato válido.');
        }
        if (activo) {
          setLocales(resultado.data.slice(0, 3));
        }
      } catch (err) {
        if (activo) {
          setError(err.message || 'No se pudieron cargar los locales.');
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarLocales();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <Box component="aside" aria-label="Locales" sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Locales
      </Typography>
      {cargando && <Typography role="status">Cargando locales...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}
      {!cargando && !error && locales.length === 0 && (
        <Typography>No hay locales disponibles.</Typography>
      )}
      {!error && locales.map((local, index) => (
        <Card
          key={local.id}
          variant="outlined"
          sx={{
            mb: 1.5,
            animation: `localeFadeIn 450ms ease-out ${index * 90}ms both`,
            '@keyframes localeFadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" component="h3">
              {local.nombre}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {local.direccion}
            </Typography>
            <Chip
              label={local.disponibilidad ? 'Disponible' : 'No disponible'}
              color={local.disponibilidad ? 'success' : 'error'}
              variant="outlined"
              size="small"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}