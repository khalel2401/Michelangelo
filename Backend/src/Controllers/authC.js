import { sendSuccess, 
        sendError } 
        from "../Handlers/responseHandler.js";
import * as authService from "../Services/authS.js";
import { loginSchema } from "../Schemas/usuarioSch.js";

export const login = async (req, res) => {
    try {
        const { correo, constrasena } = req.body;
        const { error } = loginSchema.validate({ correo, constrasena });
        if (error) {
            return sendError(res, "Datos de inicio de sesión inválidos", 400, error.details[0].message);
        }

        const { token } = await authService.login(correo, constrasena);
        sendSucces(res, { token }, "Inicio de sesión exitoso", 300);
    } catch (error) {
        if(error.message === "Usuario no encontrado"){
            return sendError(res, error.message, 401);
        }
        console.error("Error al iniciar sesion: ", error);
        sendError(res, "Error al iniciar sesion", 500);
    }
};