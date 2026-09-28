import { Router } from "express";
import { 
  getPersonal, 
  getPersonalPorId, 
  getPersonalPorNombre, 
  crearPersonal, 
  actualizarPersonal, 
  eliminarPersonal 
} from "../Controllers/personalC.js";

import { 
  personalSchema,
  updatePersonalSchema
} from "../Schemas/personalSch.js";

import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/personas", getPersonal);
router.get("/personas/:id", getPersonalPorId);
router.get("/personas/nombre/:nombre", getPersonalPorNombre);

router.post("/personas", validateSchema(personalSchema), crearPersonal);

router.put("/personas/:id", validateSchema(updatePersonalSchema), actualizarPersonal);

router.delete("/personas/:id", eliminarPersonal);

export default router;