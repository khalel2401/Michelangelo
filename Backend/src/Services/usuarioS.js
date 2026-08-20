const { QueryFailedError } = require("typeorm");
const db = require("../conf/db");

async function createUsuario(usuario) {
    const { nombre, correo, contrasena, rol } = usuario;