export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: `Conflicto: registro con valor:${err.meta?.target} ya existe.`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Recurso inexistente en base de datos.',
    });
  }

  if (err.code === 'P2003') {
    return res.status(400).json({
      error: 'La relación indicada no es válida (clave foránea inexistente)',
    });
  }

  return res.status(500).json({ error: 'Error interno del servidor' });
};