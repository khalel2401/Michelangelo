import * as valoracionService from "../Services/valoracionS.js";

export const getValoraciones = async (req, res) => {
  try {
    const valoraciones = await valoracionService.getAllValoraciones();
    res.status(200).json(valoraciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getValoracionPorId = async (req, res) => {
  try {
    const valoracion = await valoracionService.getValoracionById(req.params.id);
    if (!valoracion) {
      return res.status(404).json({ message: "Valoración no encontrada" });
    }
    res.status(200).json(valoracion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//listas d parametros
// GET /valoraciones/objetivo/empleado/5
export const getValoracionesPorObjetivo = async (req, res) => {
  const { rol, objetivoId } = req.params;
  try {
    const valoraciones = await valoracionService.getValoracionesByObjetivo(rol, objetivoId);
    res.status(200).json(valoraciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const crearValoracion = async (req, res) => {
  const valoracionData = req.body;
  try {
    const nuevaValoracion = await valoracionService.createValoracion(valoracionData);
    res.status(201).json(nuevaValoracion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const actualizarValoracion = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const valoracionActualizada = await valoracionService.updateValoracion(id, updatedFields);
    if (!valoracionActualizada) {
      return res.status(404).json({ message: "Valoración no encontrada" });
    }
    res.status(200).json(valoracionActualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
