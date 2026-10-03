import * as eventoService from "../Services/eventoS.js";

export const getEventos = async (req, res) => {
  try {
    const eventos = await eventoService.obtenerEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const getEventoPorId = async (req, res) => {
  try {
    const evento = await eventoService.obtenerEventoPorId(req.params.id);
    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = await eventoService.crearEvento(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await eventoService.obtenerEventoPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    const eventoActualizado = await eventoService.actualizarEvento(id, req.body);
    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const existe = await eventoService.obtenerEventoPorId(id);
    if (!existe) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    await eventoService.eliminarEvento(id);
    res.status(200).json({ mensaje: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};