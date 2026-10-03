import prisma from "../Config/prisma.js";

export const obtenerEventos = async () => {
  return await prisma.evento.findMany({
    include: {
      cotizacion: true,
    },
  });
};

export const obtenerEventoPorId = async (id) => {
  return await prisma.evento.findUnique({
    where: { id: parseInt(id) },
    include: {
      cotizacion: true,
    },
  });
};

export const crearEvento = async (eventoData) => {
  return await prisma.evento.create({
    data: eventoData,
    include: {
      cotizacion: true,
    },
  });
};

export const actualizarEvento = async (id, eventoData) => {
  return await prisma.evento.update({
    where: { id: parseInt(id) },
    data: eventoData,
    include: {
      cotizacion: true,
    },
  });
};

export const eliminarEvento = async (id) => {
  return await prisma.evento.delete({
    where: { id: parseInt(id) },
  });
};