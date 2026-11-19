import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMisValoraciones, getTrabajadores } from '../../Services/valoracionS.js';
import { getEventos } from '../../Services/eventoS.js';
import { obtenerUsuario } from '../../Services/sesionS.js';

export function useValoraciones() {
  const [mis, setMis] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const usuario = useMemo(() => obtenerUsuario(), []);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    
    const [rMis, rEventos, rTrab] = await Promise.all([getMisValoraciones(), getEventos(), getTrabajadores()]);
    const fallo = [rMis, rEventos, rTrab].find((r) => !r.success);
    if (fallo) {
      setError(fallo.message);
    } else {
      setMis(Array.isArray(rMis.data) ? rMis.data : []);
      setEventos(Array.isArray(rEventos.data) ? rEventos.data : []);
      setTrabajadores(Array.isArray(rTrab.data) ? rTrab.data : []);
    }
    setCargando(false);
  }, []);

  useEffect(() => { recargar(); }, [recargar]);
  
  const eventosPorValorar = useMemo(() => {
    const yaValorados = new Set(mis.map((v) => v.eventoId).filter(Boolean));
    const ahora = new Date();
    return eventos.filter((e) => new Date(e.fecha) <= ahora && !yaValorados.has(e.id));
  }, [eventos, mis]);

  // Regla del backend: no puedes valorarte a ti mismo.
  const trabajadoresPorValorar = useMemo(() => {
    const yaValorados = new Set(mis.map((v) => v.trabajadorId).filter(Boolean));
    return trabajadores.filter((t) => t.id !== usuario?.id && !yaValorados.has(t.id));
  }, [trabajadores, mis, usuario]);

  return { usuario, mis, eventos, trabajadores, eventosPorValorar, trabajadoresPorValorar, cargando, error, recargar };
}
