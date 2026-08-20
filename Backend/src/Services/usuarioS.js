const { QueryFailedError } = require("typeorm");
const db = require("../conf/db");

async function createUsuario(usuario) {
    const { nombre, correo, contrasena, rol } = usuario;
}

async function getUsuarioById(id) {
    const usuarioRepository = db.getRepository("Usuario");
    const usuario = await usuarioRepository.findOne({ where: { id } });
    return usuario;
}

async function getUsuarioByCorreo(correo) {
    const usuarioRepository = db.getRepository("Usuario");
    const usuario = await usuarioRepository.findOne({ where: { correo } });
    return usuario;
}

async function updateUsuario(id, updatedFields) {
    const usuarioRepository = db.getRepository("Usuario");
    await usuarioRepository.update(id, updatedFields);
}

async function deleteUsuario(id) {
    const usuarioRepository = db.getRepository("Usuario");
    await usuarioRepository.delete(id);
}

module.exports = {
    createUsuario,
    getUsuarioById,
    getUsuarioByCorreo,
    updateUsuario,
    deleteUsuario,
};