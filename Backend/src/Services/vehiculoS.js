import prisma from "../Config/prisma.js";

export const getAllVehiculos = async () => {
    return await prisma.vehiculo.findMany();
}

export const getVehiculoById = async (id) => {
    return await prisma.vehiculo.findUnique({
        where: { id: parseInt(id) },
    });
}

export const createVehiculo = async (vehiculoData) => {
  return await prisma.vehiculo.create({
    data: vehiculoData,
  });
}

export const updateVehiculo = async (id, vehiculoData) => {
  return await prisma.vehiculo.update({
    where: { id: parseInt(id) },
    data: vehiculoData,
  });
}

export const deleteVehiculo = async (id) => {
  return await prisma.vehiculo.delete({
    where: { id: parseInt(id) },
  });
}