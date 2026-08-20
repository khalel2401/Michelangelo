const { sendSuccess, sendError } = require("../handlers/responseHandler");
const usuarioService = require("../service/usuarioService");
const {usuarioSchema,updateUsuarioSchema} = require("../validation/usuarioV");

async function createUsuario(req, res) {
    try {
        const { error, value } = usuarioSchema.validate(req.body);
        if (error) {
            return sendError(res, 400, error.details[0].message);
        }

        const usuario = await usuarioService.createUsuario(value);
        return sendSuccess(res, 201, "Usuario creado exitosamente", usuario);
    } catch (err) {
        console.error(err);
        return sendError(res, 500, "Error interno del servidor");
    }
}

async function getUsuarioById(req, res) {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.getUsuarioById(id);
        if (!usuario) {
            return sendError(res, 404, "Usuario no encontrado");
        }
        return sendSuccess(res, 200, "Usuario encontrado", usuario);
    } catch (err) {
        console.error(err);
        return sendError(res, 500, "Error interno del servidor");
    }
}

async function updateUsuario(req, res) {
    try {
        const { id } = req.params;
        const { error, value } = updateUsuarioSchema.validate(req.body);
        if (error) {
            return sendError(res, 400, error.details[0].message);
        }

        await usuarioService.updateUsuario(id, value);
        return sendSuccess(res, 200, "Usuario actualizado exitosamente");
    } catch (err) {
        console.error(err);
        return sendError(res, 500, "Error interno del servidor");
    }
}

async function deleteUsuario(req, res) {
    try {
        const { id } = req.params;
        await usuarioService.deleteUsuario(id);
        return sendSuccess(res, 200, "Usuario eliminado exitosamente");
    } catch (err) {
        console.error(err);
        return sendError(res, 500, "Error interno del servidor");
    }
}

module.exports = {
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
};