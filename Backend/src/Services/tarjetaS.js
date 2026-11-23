import prisma from "../Config/prisma.js";

export const crearTarjeta = async (tarjetaData) => {
  return await prisma.tarjeta.create({
    data: tarjetaData,
  });
}

export const obtenerTarjetas = async () => {
  return await prisma.tarjeta.findMany();
}

export const obtenerTarjetaPorUser = async (id) => {
    return await prisma.tarjeta.findMany({
        where: {
            usuarioId: parseInt(id)
        }
    });
}

export const borrarTarjeta = async (id) => {
    return await prisma.tarjeta.delete({
        where: {
            id: id
        }
    });
}
