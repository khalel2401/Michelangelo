import prisma from "../Config/prisma.js";

export const createLocal = async (localData) => {
	return await prisma.local.create({ data: localData });
};

export const getLocales = async () => {
	return await prisma.local.findMany();
};

export const getLocalById = async (id) => {
	return await prisma.local.findUnique({ where: { id: parseInt(id) } });
};

export const updateLocal = async (id, localData) => {
	return await prisma.local.update({ where: { id: parseInt(id) }, data: localData });
};

export const deleteLocal = async (id) => {
	return await prisma.local.delete({ where: { id: parseInt(id) } });
};

export const getLocalByNombreDueno = async (nombreDueno) => {
	return await prisma.local.findMany({ where: { nombreDueno } });
};

export const getLocalesDisponibles = async () => {
	return await prisma.local.findMany({ where: { Disponibilidad: true } });
};

