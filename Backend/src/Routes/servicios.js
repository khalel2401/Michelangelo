import { Router } from "express";
import {
  getServicios,
  getServicioPorId,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from "../Controllers/servicioC.js";
import {
  servicioSchema,
  updateServicioSchema,
} from "../Schemas/servicioSch.js";
import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/servicios", getServicios);
router.get("/servicios/:id", getServicioPorId);
router.post("/servicios", validateSchema(servicioSchema), crearServicio);
router.put("/servicios/:id", validateSchema(updateServicioSchema), actualizarServicio);
router.delete("/servicios/:id", eliminarServicio);

export default router;