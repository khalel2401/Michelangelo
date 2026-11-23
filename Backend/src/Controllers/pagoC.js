import {
  procesarPagoCotizacion,
  listarPagosUsuario
} from "../Services/pagoS.js";

export const pagarCotizacion = async (req, res) => {
  try {
    const { cotizacionId, tarjetaId, monto } = req.body;

    if (!cotizacionId || !tarjetaId) {
      return res.status(400).json({
        success: false,
        message: "Se requiere cotizacionId y tarjetaId"
      });
    }

    const resultado = await procesarPagoCotizacion({
      cotizacionId: Number(cotizacionId),
      tarjetaId: Number(tarjetaId),
      usuarioId: req.usuario.id,
      monto: monto === undefined ? undefined : Number(monto)
    });

    return res.status(200).json({
      success: true,
      message: "Pago registrado exitosamente",
      data: resultado
    });

  } catch (error) {
    console.error("Error en pago:", error.message);

    const errores = {
      TARJETA_INVALIDA: [400, "La tarjeta no es válida o no pertenece al usuario"],
      COTIZACION_NO_ENCONTRADA: [404, "Cotización no encontrada"],
      COTIZACION_NO_PAGABLE: [409, "La cotización ya está pagada o no es pagable"],
      MONTO_INVALIDO: [400, "El monto del pago es inválido"]
    };

    const [status, message] =
      errores[error.message] ?? [500, "Error interno al procesar el pago"];

    return res.status(status).json({
      success: false,
      message
    });
  }
};

export const obtenerPagos = async (req, res) => {
  try {
    const pagos = await listarPagosUsuario(req.usuario.id);

    return res.status(200).json({
      success: true,
      data: pagos
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el historial"
    });
  }
};