import prisma from "../Config/prisma.js";

export const getAllPersonal = async () => {
  return await prisma.personal.findMany();
};

export const getPersonalById = async (id) => {
  return await prisma.personal.findUnique({
    where: { id: parseInt(id) },
  });
}

export const getPersonalByNombre = async (nombre) => {
  return await prisma.personal.findMany({
    where: { nombre },
  });
}

export const createPersonal = async (personalData) => {
  return await prisma.personal.create({
    data: personalData,
  });
}

export const updatePersonal = async (id, personalData) => {
  return await prisma.personal.update({
    where: { id: parseInt(id) },
    data: personalData,
  });
}

export const deletePersonal = async (id) => {
  return await prisma.personal.delete({
    where: { id: parseInt(id) },
  });
}