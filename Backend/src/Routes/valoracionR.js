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
//rehacer rutas para valoraciones
export default router;