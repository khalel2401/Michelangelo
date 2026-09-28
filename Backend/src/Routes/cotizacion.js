import { Router } from "express";
import {
  getCotizaciones,
  getCotizacionPorId,
  crearCotizacion,
  actualizarCotizacion,
  eliminarCotizacion,
} from "../Controllers/cotizacion.js";
import {
  cotizacionSchema,
  updateCotizacionSchema,
} from "../Schemas/cotizacion.js";
import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/cotizaciones", getCotizaciones);
router.get("/cotizaciones/:id", getCotizacionPorId);
router.post("/cotizaciones", validateSchema(cotizacionSchema), crearCotizacion);
router.put("/cotizaciones/:id", validateSchema(updateCotizacionSchema), actualizarCotizacion);
router.delete("/cotizaciones/:id", eliminarCotizacion);

export default router;