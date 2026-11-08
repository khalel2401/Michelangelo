import prisma from '../Config/prisma.js';

const ROLES_TRABAJADOR = ['admin'];
const crearError = (status, message) => Object.assign(new Error(message), { status });

const incluir = {
  autor: { select: { id: true, nombre: true, apellido: true } },
  trabajador: { select: { id: true, nombre: true, apellido: true } },
  evento: { select: { id: true, nombre: true, fecha: true } },
};

const buscarEvento = async (id) => {
  const evento = await prisma.evento.findUnique({ where: { id } });
  if (!evento) throw crearError(404, 'Evento no encontrado');
  return evento;
};

const buscarTrabajador = async (id) => {
  const trabajador = await prisma.usuario.findUnique({ where: { id } });
  if (!trabajador || !ROLES_TRABAJADOR.includes(trabajador.rol)) {
    throw crearError(404, 'Trabajador no encontrado');
  }
  return trabajador;
};

const buscarValoracion = async (id) => {
  const valoracion = await prisma.valoracion.findUnique({ where: { id }, include: incluir });
  if (!valoracion) throw crearError(404, 'Valoracion no encontrada');
  return valoracion;
};

const verificarPermiso = (usuario, valoracion) => {
  if (usuario.rol !== 'admin' && valoracion.autorId !== usuario.id) {
    throw crearError(403, 'No tienes permiso sobre esta valoracion');
  }
};

const resumen = async (where) => {
  const [valoraciones, stats] = await Promise.all([
    prisma.valoracion.findMany({ where, include: incluir, orderBy: { createdAt: 'desc' } }),
    prisma.valoracion.aggregate({ where, _avg: { calificacion: true }, _count: true }),
  ]);
  const promedio = stats._avg.calificacion;
  return {
    promedio: promedio === null ? null : Math.round(promedio * 100) / 100,
    total: stats._count,
    valoraciones,
  };
};

export const getValoraciones = () =>
  prisma.valoracion.findMany({ include: incluir, orderBy: { createdAt: 'desc' } });


export const getTrabajadores = () =>
  prisma.usuario.findMany({
    where: { rol: { in: ROLES_TRABAJADOR } },
    select: { id: true, nombre: true, apellido: true },
    orderBy: { nombre: 'asc' },
  });

export const getValoracionesByAutor = (autorId) =>
  prisma.valoracion.findMany({ where: { autorId }, include: incluir, orderBy: { createdAt: 'desc' } });

export const getValoracionById = async (id, usuario) => {
  const valoracion = await buscarValoracion(id);
  verificarPermiso(usuario, valoracion);
  return valoracion;
};

export const getValoracionesDeTrabajador = async (trabajadorId) => {
  await buscarTrabajador(trabajadorId);
  return resumen({ trabajadorId });
};

export const getValoracionesDeEvento = async (eventoId) => {
  await buscarEvento(eventoId);
  return resumen({ eventoId });
};

export const createValoracion = async ({ calificacion, comentario, trabajadorId, eventoId }, usuario) => {
  if (trabajadorId !== undefined) {
    if (trabajadorId === usuario.id) {
      throw crearError(400, 'No puedes valorarte a ti mismo');
    }
    await buscarTrabajador(trabajadorId);
  } else {
    const evento = await buscarEvento(eventoId);
    if (evento.fecha > new Date()) {
      throw crearError(400, 'El evento aun no ocurre, no se puede valorar');
    }
  }

  try {
    return await prisma.valoracion.create({
      data: { calificacion, comentario, trabajadorId, eventoId, autorId: usuario.id },
      include: incluir,
    });
  } catch (err) {
    if (err.code === 'P2002') {
      throw crearError(400, 'Ya se ha realizado una valoracion para este evento o trabajador');
    }
    throw err;
  }
};

export const updateValoracion = async (id, datos, usuario) => {
  const valoracion = await buscarValoracion(id);
  verificarPermiso(usuario, valoracion);
  return prisma.valoracion.update({
    where: { id },
    data: { calificacion: datos.calificacion, comentario: datos.comentario },
    include: incluir,
  });
};

export const deleteValoracion = async (id, usuario) => {
  const valoracion = await buscarValoracion(id);
  verificarPermiso(usuario, valoracion);
  await prisma.valoracion.delete({ where: { id } });
};