import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMisValoraciones, getTodasValoraciones, getTrabajadores } from '../../Services/valoracionS.js';
import { getEventos } from '../../Services/eventoS.js'; // <- servicio de tu compañero, lo REUTILIZAMOS
import { obtenerUsuario } from '../../Services/sesionS.js';

export function useValoraciones() {
  const [mis, setMis] = useState([]);
  const [todas, setTodas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [sesionExpirada, setSesionExpirada] = useState(false);

  const usuario = useMemo(() => {
    const u = obtenerUsuario();
    if (!u) return null;
    return { ...u, rol: u.rol ?? localStorage.getItem('role') ?? undefined };
  }, []);
  const esAdmin = usuario?.rol === 'admin';

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    setSesionExpirada(false);
    try {
      
      const pedidos = [getMisValoraciones(), getEventos(), getTrabajadores()];
      if (esAdmin) pedidos.push(getTodasValoraciones());
      const [rMis, rEventos, rTrab, rTodas] = await Promise.all(pedidos);

      const fallo = [rMis, rEventos, rTrab, rTodas].filter(Boolean).find((r) => !r.success);
      if (fallo) {
        setError(fallo.message);
        setSesionExpirada(fallo.status === 401);
      } else {
        setMis(Array.isArray(rMis.data) ? rMis.data : []);
        setEventos(Array.isArray(rEventos.data) ? rEventos.data : []);
        setTrabajadores(Array.isArray(rTrab.data) ? rTrab.data : []);
        setTodas(Array.isArray(rTodas?.data) ? rTodas.data : []);
      }
    } catch (e) {
     
      console.error(e);
      setError('Error inesperado al cargar las valoraciones');
    } finally {
      setCargando(false);
    }
  }, [esAdmin]);

  useEffect(() => { recargar(); }, [recargar]);

  const eventosPorValorar = useMemo(() => {
    const yaValorados = new Set(mis.map((v) => v.eventoId).filter(Boolean));
    const ahora = new Date();
    return eventos.filter((e) => new Date(e.fecha) <= ahora && !yaValorados.has(e.id));
  }, [eventos, mis]);

  //no puedes valorarte a ti mismo.
  const trabajadoresPorValorar = useMemo(() => {
    const yaValorados = new Set(mis.map((v) => v.trabajadorId).filter(Boolean));
    return trabajadores.filter((t) => t.id !== usuario?.id && !yaValorados.has(t.id));
  }, [trabajadores, mis, usuario]);

  return {
    usuario, esAdmin, mis, todas, eventos, trabajadores,
    eventosPorValorar, trabajadoresPorValorar,
    cargando, error, sesionExpirada, recargar,
  };
}