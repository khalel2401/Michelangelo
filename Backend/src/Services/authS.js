const { 
    getUsuarioByCorreo,
    getUsuarioById
} = require("./usuarioS.js");
const jwt = require("jsonwebtoken");

export const login = async (correo, contrasena) => {
    const usuario = await getUsuarioByCorreo(correo);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const contrasenaValida = usuario.contraseña === contrasena;
    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    };

    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }
        , process.env.JWT_SECRET, { expiresIn: "1h" });

    return { token };
};

const verificarToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await getUsuarioById(decoded.id);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return usuario;
    } catch (error) {
        throw new Error("Token inválido");
    }
};