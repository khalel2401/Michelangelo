import prisma from "../Config/prisma.js";

export const obtenerEventos = async () => {
  return await prisma.evento.findMany({
    include: {
      cotizacion: {
        include: {
          local: true,
        },
      },
      contrataciones: true,
    },
  });
};

export const obtenerEventoPorId = async (id) => {
  return await prisma.evento.findUnique({
    where: { id: parseInt(id) },
    include: {
      cotizacion: {
        include: {
          local: true,
        },
      },
      contrataciones: true,
    },
  });
};

export const crearEvento = async (eventoData) => {
  const cotizacion = await prisma.cotizacion.findUnique({
    where: { id: parseInt(eventoData.cotizacionId) },
  });

  if (!cotizacion) {
    throw new Error("1");
  }
  if (cotizacion.abono < cotizacion.valorTotal * 0.5) {
    throw new Error("2");
  }

  return await prisma.evento.create({
    data: {
      nombre: eventoData.nombre,
      fecha: new Date(eventoData.fecha),
      cotizacionId: parseInt(eventoData.cotizacionId),
    },
    include: {
      cotizacion: {
        include: {
          local: true,
        },
      },
    },
  });
};

export const actualizarEvento = async (id, eventoData) => {
  const dataToUpdate = { ...eventoData };

  if (dataToUpdate.fecha) {
    dataToUpdate.fecha = new Date(dataToUpdate.fecha);
  }
  if (dataToUpdate.cotizacionId) {
    dataToUpdate.cotizacionId = parseInt(dataToUpdate.cotizacionId);
  }

  return await prisma.evento.update({
    where: { id: parseInt(id) },
    data: dataToUpdate,
    include: {
      cotizacion: {
        include: {
          local: true,
        },
      },
    },
  });
};

export const eliminarEvento = async (id) => {
  return await prisma.evento.delete({
    where: { id: parseInt(id) },
  });
};