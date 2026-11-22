import prisma from "../Config/prisma.js";

export const getAllCotizacionesServicios = async () => {
  return await prisma.cotizacionServicio.findMany({
    include: {
      cotizacion: true,
      servicio: true
    }
  });
};

export const getCotizacionServicioById = async (id) => {
  return await prisma.cotizacionServicio.findUnique({
    where: { id: parseInt(id) },
    include: {
      cotizacion: true,
      servicio: true
    }
  });
};

export const createCotizacionServicio = async (data) => {
  return await prisma.cotizacionServicio.create({
    data: {
      cotizacionId: parseInt(data.cotizacionId),
      servicioId: parseInt(data.servicioId)
    }
  });
};

export const deleteCotizacionServicio = async (id) => {
  return await prisma.cotizacionServicio.delete({
    where: { id: parseInt(id) }
  });
};