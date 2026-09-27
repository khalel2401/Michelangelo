import prisma from '../Config/prisma.js';

export const getAllValoraciones = async () => {
  return await prisma.valoracion.findMany();
};

export const getValoracionById = async (id) => {
  return await prisma.valoracion.findUnique({
    where: { id: parseInt(id) },
  });
}

export const getValoracionesByObjetivo = async (rol, objetivoId) => {
  return await prisma.valoracion.findMany({
    where: {
      rol,
      objetivoId: parseInt(objetivoId),
    },
  });
}

export const createValoracion = async (valoracionData) => {
  return await prisma.valoracion.create({
    data: valoracionData,
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