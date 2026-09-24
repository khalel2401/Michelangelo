import { Router } from "express";
import { createUsuario, 
    getUsuarioPorId, 
    getUsuarioPorCorreo, 
    actualizarUsuario, 
    eliminarUsuario } 
from "../Services/usuarioC.js";
import { usuarioSchema, 
    updateUsuarioSchema, 
    loginSchema } 
from "../Schemas/usuarioSchema.js";
import { validateSchema } from "../Middlewares/validarM.js";

const router = Router();

router.post("/usuarios", validateSchema(usuarioSchema), createUsuario);
router.get("/usuarios/:id", getUsuarioPorId);
router.get("/usuarios/correo/:correo", getUsuarioPorCorreo);
router.put("/usuarios/:id", validateSchema(updateUsuarioSchema), actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router