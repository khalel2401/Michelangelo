import { sendSuccess, 
        sendError } 
        from "../Handlers/responseHandler.js";
import * as authService from "../Services/authS.js";
import { loginSchema } from "../Schemas/usuarioSch.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = loginSchema.safeParse({ email, password });
        if (error) {
            return sendError(res, "Datos de inicio de sesión inválidos", 400, error.issues[0].message);
        }

        const { token } = await authService.login(email, password);
        return sendSuccess(res, { token }, "Inicio de sesión exitoso", 200);
    } catch (error) {
        if (error.message === "Usuario no encontrado" || error.message === "Contraseña incorrecta") {
            return sendError(res, error.message, 401);
        }
        console.error("Error al iniciar sesion: ", error);
        return sendError(res, "Error al iniciar sesion", 500);
    }
};