import prisma from '../Config/prisma.js';

const crearError = (status, message) => Object.assign(new Error(message), { status });

const ROLES_PERMITIDOS = {
  cliente: ['empleado', 'local'],
  admin: ['empleado', 'local', 'cliente'],
};

export const getAllValoraciones = async () => {
  return await prisma.valoracion.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getValoracionById = async (id) => {
  return await prisma.valoracion.findUnique({
    where: { id: parseInt(id) },
  });
}

export const getValoracionesByAutor = async (autorId) => {
  return await prisma.valoracion.findMany({
    where: { autorId },
    orderBy: { createdAt: 'desc' },
  });
}

export const getValoracionesByObjetivo = async (rol, objetivoId) => {
  return await prisma.valoracion.findMany({
    where: {
      rol,
      objetivoId: parseInt(objetivoId),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export const createValoracion = async (valoracionData, autor) => {
  const permitidos = ROLES_PERMITIDOS[autor.rol] ?? [];
  if (!permitidos.includes(valoracionData.rol)) {
    throw crearError(403, `Un usuario con rol "${autor.rol}" no puede valorar a un "${valoracionData.rol}"`);
  }

  if (valoracionData.rol === 'cliente') {
    if (valoracionData.objetivoId === autor.id) {
      throw crearError(400, 'No puedes valorarte a ti mismo');
    }
    const objetivo = await prisma.usuario.findUnique({
      where: { id: valoracionData.objetivoId },
    });
    if (!objetivo || objetivo.rol !== 'cliente') {
      throw crearError(404, 'El cliente indicado no existe');
    }
  }

  const duplicada = await prisma.valoracion.findFirst({
    where: {
      autorId: autor.id,
      rol: valoracionData.rol,
      objetivoId: valoracionData.objetivoId,
      eventoId: valoracionData.eventoId ?? null,
    },
  });
  if (duplicada) {
    throw crearError(409, 'Ya realizaste una valoración para este objetivo en este evento');
  }

  return await prisma.valoracion.create({
    data: { ...valoracionData, autorId: autor.id },
  });
}

export const updateValoracion = async (id, valoracionData) => {
  return await prisma.valoracion.update({
    where: { id: parseInt(id) },
    data: valoracionData,
  });
}

export const deleteValoracion = async (id) => {
  return await prisma.valoracion.delete({
    where: { id: parseInt(id) },
  });
}
