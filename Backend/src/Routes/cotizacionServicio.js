import { Router } from "express";
import * as controller from "../Controllers/cotizacionServicio.js";
import { validarSchema } from "../Middlewares/validarM.js";
import { cotizacionServicioSchema } from "../Schemas/cotizacionServicio.js";

const router = Router();

router.get("/", controller.getCotizacionesServicios);
router.get("/:id", controller.getCotizacionServicioById);
router.post("/", validarSchema(cotizacionServicioSchema), controller.createCotizacionServicio);
router.delete("/:id", controller.deleteCotizacionServicio);

export default router;