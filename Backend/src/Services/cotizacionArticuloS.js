import prisma from "../Config/prisma.js";

export const getAllCotizacionArticulos = async () => {
  return await prisma.cotizacionArticulo.findMany({
    include: {
      cotizacion: true,
      articulo: true,
    }
  });
}

export const getCotizacionArticuloById = async (id) => {
  return await prisma.cotizacionArticulo.findUnique({
    where: { id: parseInt(id) },
    include: {
      cotizacion: true,
      articulo: true,
    }
  });
}

export const createCotizacionArticulo = async (data) => {
  return await prisma.cotizacionArticulo.create({
    data,
  });
}

export const updateCotizacionArticulo = async (id, data) => {
  return await prisma.cotizacionArticulo.update({
    where: { id: parseInt(id) },
    data,
  });
}

export const deleteCotizacionArticulo = async (id) => {
  return await prisma.cotizacionArticulo.delete({
    where: { id: parseInt(id) },
  });
}