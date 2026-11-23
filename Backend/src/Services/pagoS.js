import prisma from "../Config/prisma.js";

export const procesarPagoCotizacion = async ({
  cotizacionId,
  tarjetaId,
  usuarioId,
  monto,
}) => {
  if (!Number.isInteger(cotizacionId)) {
    throw new Error("COTIZACION_NO_ENCONTRADA");
  }

  if (!Number.isInteger(tarjetaId) || !Number.isInteger(usuarioId)) {
    throw new Error("TARJETA_INVALIDA");
  }

  return prisma.$transaction(async (tx) => {
    const tarjeta = await tx.tarjeta.findFirst({
      where: {
        id: tarjetaId,
        usuarioId,
      },
    });

    if (!tarjeta) {
      throw new Error("TARJETA_INVALIDA");
    }

    const cotizacion = await tx.cotizacion.findUnique({
      where: { id: cotizacionId },
    });

    if (!cotizacion) {
      throw new Error("COTIZACION_NO_ENCONTRADA");
    }

    if (cotizacion.estado !== "pendiente") {
      throw new Error("COTIZACION_NO_PAGABLE");
    }

    const montoPago = monto === undefined ? cotizacion.abono : monto;
    const montoEntero = Number.isFinite(Number(montoPago))
      ? Math.round(Number(montoPago))
      : 0;

    if (!Number.isInteger(montoEntero) || montoEntero <= 0) {
      throw new Error("MONTO_INVALIDO");
    }

    const actualizacion = await tx.cotizacion.updateMany({
      where: {
        id: cotizacion.id,
        estado: "pendiente",
      },
      data: {
        estado: "pagado",
      },
    });

    if (actualizacion.count !== 1) {
      throw new Error("COTIZACION_NO_PAGABLE");
    }

    return tx.pago.create({
      data: {
        tarjetaId: tarjeta.id,
        cotizacionId: cotizacion.id,
        monto: montoEntero,
      },
      select: {
        id: true,
        monto: true,
        createdAt: true,
        tarjeta: {
          select: {
            id: true,
            tipo: true,
            titular: true,
          },
        },
        cotizacion: {
          select: {
            id: true,
            estado: true,
            valorTotal: true,
            abono: true,
          },
        },
      },
    });
  }, {
    isolationLevel: "Serializable",
  });
};

export const listarPagosUsuario = async (usuarioId) => {
  return prisma.pago.findMany({
    where: {
      tarjeta: {
        usuarioId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      monto: true,
      createdAt: true,
      tarjeta: {
        select: {
          id: true,
          tipo: true,
          titular: true,
        },
      },
      cotizacion: {
        select: {
          id: true,
          estado: true,
          valorTotal: true,
          abono: true,
        },
      },
    },
  });
};