import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useValoraciones } from '../components/valoraciones/useValoraciones.js';
import ListaPorValorar from '../components/valoraciones/ListaPorValorar.jsx';
import MisValoraciones from '../components/valoraciones/MisValoraciones.jsx';
import ResumenAdmin from '../components/valoraciones/ResumenAdmin.jsx';
import ValoracionForm from '../components/valoraciones/ValoracionForm.jsx';

export default function Valoraciones() {
  const navigate = useNavigate();
  const {
    usuario, mis, eventos, trabajadores, eventosPorValorar, trabajadoresPorValorar, cargando, error, recargar,
  } = useValoraciones();
  const esAdmin = usuario?.rol === 'admin';

  const [tab, setTab] = useState('eventos');
  // Un solo diálogo para crear/editar: guardamos QUÉ se está valorando.
  const [dialogo, setDialogo] = useState({ open: false, objetivo: null, valoracion: null });
  const cerrarDialogo = () => setDialogo((d) => ({ ...d, open: false }));

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>Valoraciones</Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab value="eventos" label={`Eventos por valorar (${eventosPorValorar.length})`} />
        <Tab value="trabajadores" label={`Trabajadores por valorar (${trabajadoresPorValorar.length})`} />
        <Tab value="mias" label={`Mis valoraciones (${mis.length})`} />
        {esAdmin && <Tab value="resumen" label="Resumen (admin)" />}
      </Tabs>

      {cargando && <Typography role="status" align="center">Cargando valoraciones...</Typography>}
      {error && <Alert severity="error" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>{error}</Alert>}

      {!cargando && !error && tab === 'eventos' && (
        <ListaPorValorar
          items={eventosPorValorar.map((e) => ({
            id: e.id,
            titulo: e.nombre,
            subtitulo: e.fecha ? new Date(e.fecha).toLocaleDateString('es-CL') : '',
          }))}
          vacio="No tienes eventos pendientes por valorar."
          onValorar={(item) => setDialogo({ open: true, objetivo: { tipo: 'evento', ...item }, valoracion: null })}
        />
      )}

      {!cargando && !error && tab === 'trabajadores' && (
        <ListaPorValorar
          items={trabajadoresPorValorar.map((t) => ({ id: t.id, titulo: `${t.nombre} ${t.apellido}` }))}
          vacio="No hay trabajadores pendientes por valorar."
          onValorar={(item) => setDialogo({ open: true, objetivo: { tipo: 'trabajador', ...item }, valoracion: null })}
        />
      )}

      {!cargando && !error && tab === 'mias' && (
        <MisValoraciones
          valoraciones={mis}
          onEditar={(valoracion) => setDialogo({ open: true, objetivo: null, valoracion })}
          onCambio={recargar}
        />
      )}

      {!cargando && !error && tab === 'resumen' && esAdmin && (
        <ResumenAdmin eventos={eventos} trabajadores={trabajadores} />
      )}

      <ValoracionForm {...dialogo} onClose={cerrarDialogo} onGuardado={recargar} />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => navigate('/')}>Volver al menu</Button>
      </Box>
    </Box>
  );
}
