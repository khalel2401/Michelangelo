import { Router } from "express";
import { 
  getUsuarios, 
  getUsuarioPorId, 
  getUsuarioPorNombre, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario, 
  getUsuarioPorCorreo
} from "../Controllers/usuarioC.js";

import { 
  usuarioSchema, 
  updateUsuarioSchema, 
  loginSchema 
} from "../Schemas/usuarioSch.js";

import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.post("/usuarios", validateSchema(usuarioSchema), crearUsuario);
router.get("/usuarios/:id", getUsuarioPorId);
router.get("/usuarios/correo/:correo", getUsuarioPorCorreo);
router.put("/usuarios/:id", validateSchema(updateUsuarioSchema), actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router;