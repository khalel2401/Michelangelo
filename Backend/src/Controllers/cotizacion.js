import * as cotizacionService from "../Services/cotizacion.js";

export const getCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await cotizacionService.obtenerCotizaciones();
    res.status(200).json(cotizaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const getCotizacionPorId = async (req, res) => {
  try {
    const cotizacion = await cotizacionService.obtenerCotizacionPorId(req.params.id);
    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    res.status(200).json(cotizacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const crearCotizacion = async (req, res) => {
  try {
    const nuevaCotizacion = await cotizacionService.crearCotizacion(req.body);
    res.status(201).json(nuevaCotizacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const actualizarCotizacion = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await cotizacionService.obtenerCotizacionPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    const cotizacionActualizada = await cotizacionService.actualizarCotizacion(id, req.body);
    res.status(200).json(cotizacionActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const eliminarCotizacion = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await cotizacionService.obtenerCotizacionPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    await cotizacionService.eliminarCotizacion(id);
    res.status(200).json({ mensaje: "Cotización eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};