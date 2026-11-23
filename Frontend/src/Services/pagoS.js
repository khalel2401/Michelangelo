import { instance as axios } from "./rootS.js";

export const pagarCotizacion = async (cotizacionId, tarjetaId, monto) => {
  try {
    const body = {
      cotizacionId,
      tarjetaId,
    };

    if (monto !== undefined) {
      body.monto = monto;
    }

    const response = await axios.post("/pagos", body);
    return {
      success: true,
      data: response.data?.data ?? response.data,
      message: response.data?.message || "Pago registrado exitosamente",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Error al realizar el pago",
    };
  }
};

export const obtenerPagos = async () => {
  try {
    const response = await axios.get("/pagos");
    return {
      success: true,
      data: response.data?.data ?? response.data,
      message: response.data?.message || "Pagos obtenidos",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Error al obtener pagos",
    };
  }
};