import prisma from "../Config/prisma.js";

export const obtenerServicios = async () => {
  return await prisma.servicio.findMany();
};

export const obtenerServicioPorId = async (id) => {
  return await prisma.servicio.findUnique({
    where: { id: parseInt(id) },
  });
};

export const crearServicio = async (servicioData) => {
  return await prisma.servicio.create({
    data: servicioData,
  });
};

export const actualizarServicio = async (id, servicioData) => {
  return await prisma.servicio.update({
    where: { id: parseInt(id) },
    data: servicioData,
  });
};

export const eliminarServicio = async (id) => {
  return await prisma.servicio.delete({
    where: { id: parseInt(id) },
  });
};