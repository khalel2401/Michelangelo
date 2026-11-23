import { Router } from "express";
import {
  obtenerTarjetas,
  obtenerTarjetaPorUser,
  crearTarjeta,
  borrarTarjeta
} from "../Controllers/tarjetaC.js";

import {
  tarjetaSchema,
} from "../Schemas/tarjetaSch.js";
import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/tarjetas", obtenerTarjetas);
router.get("/tarjetas/:id", obtenerTarjetaPorUser);
router.post("/tarjetas", validateSchema(tarjetaSchema), crearTarjeta);
router.delete("/tarjetas/:id", borrarTarjeta);

export default router;