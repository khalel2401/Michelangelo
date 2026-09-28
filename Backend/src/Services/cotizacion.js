import prisma from "../Config/prisma.js";

export const obtenerCotizaciones = async () => {
  return await prisma.cotizacion.findMany({
    include: {
      servicio: true,
      evento: true,
    },
  });
};

export const obtenerCotizacionPorId = async (id) => {
  return await prisma.cotizacion.findUnique({
    where: { id: parseInt(id) },
    include: {
      servicio: true,
      evento: true,
    },
  });
};

export const crearCotizacion = async (cotizacionData) => {
  return await prisma.cotizacion.create({
    data: cotizacionData,
    include: {
      servicio: true,
    },
  });
};

export const actualizarCotizacion = async (id, cotizacionData) => {
  return await prisma.cotizacion.update({
    where: { id: parseInt(id) },
    data: cotizacionData,
    include: {
      servicio: true,
    },
  });
};

export const eliminarCotizacion = async (id) => {
  return await prisma.cotizacion.delete({
    where: { id: parseInt(id) },
  });
};