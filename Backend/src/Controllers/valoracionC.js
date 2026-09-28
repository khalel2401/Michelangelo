import * as valoracionService from "../Services/valoracionS.js";

const manejarError = (err, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  next(err);
};

const esAdmin = (usuario) => usuario.rol === "admin";
const puedeGestionar = (usuario, valoracion) =>
  esAdmin(usuario) || valoracion.autorId === usuario.id;


export const getValoraciones = async (req, res, next) => {
  if (!esAdmin(req.usuario)) {
    return res.status(403).json({ message: "Solo la empresa puede ver todas las valoraciones" });
  }
  try {
    const valoraciones = await valoracionService.getAllValoraciones();
    res.status(200).json(valoraciones);
  } catch (err) {
    manejarError(err, res, next);
  }
};

export const getMisValoraciones = async (req, res, next) => {
  try {
    const valoraciones = await valoracionService.getValoracionesByAutor(req.usuario.id);
    res.status(200).json(valoraciones);
  } catch (err) {
    manejarError(err, res, next);
  }
};

export const getValoracionPorId = async (req, res, next) => {
  try {
    const valoracion = await valoracionService.getValoracionById(req.params.id);
    if (!valoracion) {
      return res.status(404).json({ message: "Valoración no encontrada" });
    }
    if (!puedeGestionar(req.usuario, valoracion)) {
      return res.status(403).json({ message: "No tienes permiso para ver esta valoración" });
    }
    res.status(200).json(valoracion);
  } catch (err) {
    manejarError(err, res, next);
  }
};

// busqueda GET /valoraciones/objetivo/empleado/5 (solo admin)
export const getValoracionesPorObjetivo = async (req, res, next) => {
  if (!esAdmin(req.usuario)) {
    return res.status(403).json({ message: "Solo la empresa puede consultar las valoraciones de un objetivo" });
  }
  const { rol, objetivoId } = req.params;
  try {
    const valoraciones = await valoracionService.getValoracionesByObjetivo(rol, objetivoId);
    res.status(200).json(valoraciones);
  } catch (err) {
    manejarError(err, res, next);
  }
};

export const crearValoracion = async (req, res, next) => {
  try {
    const nuevaValoracion = await valoracionService.createValoracion(req.body, req.usuario);
    res.status(201).json(nuevaValoracion);
  } catch (err) {
    manejarError(err, res, next);
  }
}

export const actualizarValoracion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existente = await valoracionService.getValoracionById(id);
    if (!existente) {
      return res.status(404).json({ message: "Valoración no encontrada" });
    }
    if (!puedeGestionar(req.usuario, existente)) {
      return res.status(403).json({ message: "Solo el autor o un admin puede modificar esta valoración" });
    }
    const valoracionActualizada = await valoracionService.updateValoracion(id, req.body);
    res.status(200).json(valoracionActualizada);
  } catch (err) {
    manejarError(err, res, next);
  }
};

export const eliminarValoracion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existente = await valoracionService.getValoracionById(id);
    if (!existente) {
      return res.status(404).json({ message: "Valoración no encontrada" });
    }
    if (!puedeGestionar(req.usuario, existente)) {
      return res.status(403).json({ message: "Solo el autor o un admin puede eliminar esta valoración" });
    }
    await valoracionService.deleteValoracion(id);
    res.status(200).json({ message: "Valoración eliminada correctamente" });
  } catch (err) {
    manejarError(err, res, next);
  }
};
