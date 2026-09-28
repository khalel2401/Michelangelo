import { 
    getUsuarioByCorreo,
    getUsuarioById
} from "./usuarioS.js";
import jwt from "jsonwebtoken";

export const login = async (correo, contrasena) => {
    const usuario = await getUsuarioByCorreo(correo);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const contrasenaValida = usuario.password === contrasena;
    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    };

    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: usuario.id, correo: usuario.email }
        , process.env.JWT_SECRET, { expiresIn: "1h" },);

    return { token };
};

export const verificarToken = async (token) => {
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