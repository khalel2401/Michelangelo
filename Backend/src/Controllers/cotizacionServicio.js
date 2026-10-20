import * as cotizacionServicio from "../Services/cotizacionServicio.js";

export const getCotizacionesServicios = async (req, res) => {
  try {
    const data = await cotizacionServicioS.getAllCotizacionesServicios();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCotizacionServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await cotizacionServicioS.getCotizacionServicioById(id);
    if (!item) {
      return res.status(404).json({ message: "Asociación no encontrada" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCotizacionServicio = async (req, res) => {
  try {
    const nuevo = await cotizacionServicioS.createCotizacionServicio(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCotizacionServicio = async (req, res) => {
  try {
    const { id } = req.params;
    await cotizacionServicioS.deleteCotizacionServicio(id);
    res.json({ message: "Asociación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};