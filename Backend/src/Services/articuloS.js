import prisma from "../Config/prisma.js";

export const getAllArticulos = async () => {
  return await prisma.articulo.findMany();
}

export const getArticuloById = async (id) => {
  return await prisma.articulo.findUnique({
    where: { id: parseInt(id) },
  });
}

export const createArticulo = async (articuloData) => {
  return await prisma.articulo.create({
    data: articuloData,
  });
}

export const updateArticulo = async (id, articuloData) => {
  return await prisma.articulo.update({
    where: { id: parseInt(id) },
    data: articuloData,
  });
}

export const deleteArticulo = async (id) => {
  return await prisma.articulo.delete({
    where: { id: parseInt(id) },
  });
}