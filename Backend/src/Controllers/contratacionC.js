import * as contratacionService from "../Services/contratacionS.js";

export const getContratacion = async (req, res) => {
  try {
    const contrataciones = await contratacionService.getContratacion();
    res.status(200).json(contrataciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const crearContratacion = async (req, res) => {
    try {
        const contratacionData = req.body;
        const nuevaContratacion = await contratacionService.crearContratacion(contratacionData);
        res.status(201).json(nuevaContratacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
}

export const actualizarContratacion = async (req, res) => {
    try {
        const { id } = req.params;
        const existe = await contratacionService.obtenerContratacionPorId(id);
            if (!existe) {
              return res.status(404).json({ mensaje: "Contratación no encontrada" });
            }
        const contratacionData = req.body;
        const contratacionActualizada = await contratacionService.updateContratacion(id, contratacionData);
        res.status(200).json(contratacionActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

export const eliminarContratacion =async (req, res) => {
    try {
        const { id } = req.params;
        const existe = await contratacionService.obtenerContratacionPorId(id);
            if (!existe) {
              return res.status(404).json({ mensaje: "Contratación no encontrada" });
            }
        await contratacionService.deleteContratacion(id);
        res.status(200).json({ mensaje: "Contratación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}