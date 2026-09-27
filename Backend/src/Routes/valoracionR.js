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
//rehacer rutas para valoraciones(revisar)
router.get("/valoraciones", getValoraciones);
router.get("/valoraciones/objetivo/:rol/:objetivoId", getValoracionesPorObjetivo);
router.delete("/valoraciones/:id", eliminarValoracion);
router.get("/valoraciones/:id", getValoracionPorId);
router.post("/valoraciones", validateSchema(valoracionSchema), crearValoracion);
router.put("/valoraciones/:id", validateSchema(updateValoracionSchema), actualizarValoracion);

export default router;