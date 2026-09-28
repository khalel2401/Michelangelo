import { Router } from 'express';

import {
  getValoraciones,
  getMisValoraciones,
  getValoracionPorId,
  getValoracionesPorObjetivo,
  crearValoracion,
  actualizarValoracion,
  eliminarValoracion
} from "../Controllers/valoracionC.js";

import {
  valoracionSchema,
  updateValoracionSchema,
  objetivoParamsSchema,
  idParamsSchema
} from "../Schemas/valoracionSch.js";

import { validateSchema } from "../Middlewares/validarM.js";
import { verificarAuth } from "../Middlewares/authM.js";

const router = Router();

router.use("/valoraciones", verificarAuth);
router.get("/valoraciones", getValoraciones);
router.get("/valoraciones/mias", getMisValoraciones);
router.get("/valoraciones/objetivo/:rol/:objetivoId", validateSchema(objetivoParamsSchema, 'params'), getValoracionesPorObjetivo);
router.post("/valoraciones", validateSchema(valoracionSchema), crearValoracion);
router.get("/valoraciones/:id", validateSchema(idParamsSchema, 'params'), getValoracionPorId);
router.put("/valoraciones/:id", validateSchema(idParamsSchema, 'params'), validateSchema(updateValoracionSchema), actualizarValoracion);
router.delete("/valoraciones/:id", validateSchema(idParamsSchema, 'params'), eliminarValoracion);

export default router;