import * as eventoService from "../Services/eventoS.js";

export const getEventos = async (req, res) => {
  try {
    const eventos = await eventoService.getAllEventos();
    res.status(200).json(eventos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getEventoPorId = async (req, res) => {
  try {
    const evento = await eventoService.getEventoById(req.params.id);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(evento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const crearEvento = async (req, res) => {
  const eventoData = req.body;
  try {
    const nuevoEvento = await eventoService.createEvento(eventoData);
    res.status(201).json(nuevoEvento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const eventoActualizado = await eventoService.updateEvento(id, updatedFields);
    if (!eventoActualizado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(eventoActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const eventoEliminado = await eventoService.deleteEvento(id);
    if (!eventoEliminado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json({ message: "Evento eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};