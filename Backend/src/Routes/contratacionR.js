import { Router } from "express";
import {
  getContratacion,
  crearContratacion,
  actualizarContratacion,
  eliminarContratacion,
} from "../Controllers/contratacionC.js";
import {
  contratacionSchema,
  updateContratacionSchema,
} from "../Schemas/contratacionSch.js";
import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/contrataciones", getContratacion);
router.post("/contrataciones", validateSchema(contratacionSchema), crearContratacion);
router.put("/contrataciones/:id", validateSchema(updateContratacionSchema), actualizarContratacion);
router.delete("/contrataciones/:id", eliminarContratacion);

export default router;