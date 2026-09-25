import prisma from "../Config/prisma.js";

export const getAllEventos = async () => {
  return await prisma.evento.findMany();
};

export const getEventoById = async (id) => {
  return await prisma.evento.findUnique({
    where: { id: parseInt(id) },
  });
}

export const createEvento = async (eventoData) => {
  return await prisma.evento.create({
    data: eventoData,
  });
}

export const updateEvento = async (id, eventoData) => {
  return await prisma.evento.update({
    where: { id: parseInt(id) },
    data: eventoData,
  });
}

export const deleteEvento = async (id) => {
  return await prisma.evento.delete({
    where: { id: parseInt(id) },
  });
}
