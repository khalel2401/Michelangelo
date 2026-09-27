import * as servicioService from "../Services/servicios.js";

export const getServicios = async (req, res) => {
  try {
    const servicios = await servicioService.obtenerServicios();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const getServicioPorId = async (req, res) => {
  try {
    const servicio = await servicioService.obtenerServicioPorId(req.params.id);
    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const crearServicio = async (req, res) => {
  try {
    const nuevoServicio = await servicioService.crearServicio(req.body);
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const actualizarServicio = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await servicioService.obtenerServicioPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    const servicioActualizado = await servicioService.actualizarServicio(id, req.body);
    res.status(200).json(servicioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const eliminarServicio = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await servicioService.obtenerServicioPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    await servicioService.eliminarServicio(id);
    res.status(200).json({ mensaje: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};