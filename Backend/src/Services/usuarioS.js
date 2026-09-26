import prisma from "../Config/prisma.js";

export const getAllUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id) => {
  return await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
  });
}

export const createUsuario = async (usuarioData) => {
  return await prisma.usuario.create({
    data: usuarioData,
  });
}

export const updateUsuario = async (id, usuarioData) => {
  return await prisma.usuario.update({
    where: { id: parseInt(id) },
    data: usuarioData,
  });
}

export const deleteUsuario = async (id) => {
  return await prisma.usuario.delete({
    where: { id: parseInt(id) },
  });
}

export const getUsuarioByNombre = async (nombre) => {
  return await prisma.usuario.findMany({
    where: { nombre },
  });
}

export const getUsuarioByCorreo = async (email) => {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}