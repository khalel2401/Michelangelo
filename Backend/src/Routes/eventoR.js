import { Router } from "express";
import { 
  getEventos, 
  getEventoPorId, 
  crearEvento, 
  actualizarEvento, 
  eliminarEvento 
} from "../Controllers/eventoC.js";

import { 
  eventoSchema, 
  updateEventoSchema 
} from "../Schemas/eventoSch.js";

import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/eventos", getEventos);
router.post("/eventos", validateSchema(eventoSchema), crearEvento);
router.get("/eventos/:id", getEventoPorId);
router.put("/eventos/:id", validateSchema(updateEventoSchema), actualizarEvento);
router.delete("/eventos/:id", eliminarEvento);

export default router;