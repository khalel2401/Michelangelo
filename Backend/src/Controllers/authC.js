const { sendSucces, sendError } = require ("../Handlers/responseHandler.js");
const authService = require("../Services/authS.js");
const { loginSchema } = require("../Schemas/usuarioSch.js");

export const login = async (req, res) => {
    try {
        const { correo, constrasena } = req.body;
        const { error } = loginSchema.safeParse({ correo, constrasena });
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