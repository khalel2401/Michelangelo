import { Router } from 'express';

import {
  getValoraciones,
  getValoracionPorId,
  getValoracionesPorObjetivo,
  crearValoracion,
  actualizarValoracion,
  eliminarValoracion
} from "../Controllers/valoracionC.js";

import {
  valoracionSchema,
  updateValoracionSchema
} from "../Schemas/valoracionSch.js";

import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/valoraciones", getValoraciones);
router.post("/valoraciones", validateSchema(valoracionSchema), crearValoracion);
router.get("/valoraciones/objetivo/:rol/:objetivoId", getValoracionesPorObjetivo);
router.get("/valoraciones/:id", getValoracionPorId);
router.put("/valoraciones/:id", validateSchema(updateValoracionSchema), actualizarValoracion);
router.delete("/valoraciones/:id", eliminarValoracion);

export default router;