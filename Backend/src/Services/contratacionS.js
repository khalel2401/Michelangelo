import prisma from "../Config/prisma.js";

export const getContratacion = async () => {
    return await prisma.contratacion.findMany({
        include:{
            personal: true,
            evento: true
        }
    })
}

export const crearContratacion = async (contratacionData) => {
    return await prisma.contratacion.create({
        data: {
            fecha: contratacionData.fechaContratacion,
            salario: contratacionData.salario,

            personal: {
                connect: {
                    id: contratacionData.idPersonal
                }
            },

            evento: {
                connect: {
                    id: contratacionData.idEvento
                }
            }
        }
    });
}

export const updateContratacion = async (id, contratacionData) => {
  return await prisma.contratacion.update({
    where: { id: parseInt(id) },
    data: contratacionData,
  });
}

export const deleteContratacion = async (id) => {
  return await prisma.contratacion.delete({
    where: { id: parseInt(id) },
  });
}