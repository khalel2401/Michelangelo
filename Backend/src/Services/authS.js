import {
    getUsuarioByCorreo,
    getUsuarioById
} from "./usuarioS.js";
import jwt from "jsonwebtoken";

const jwtSecret = () => process.env.JWT_SECRET || "michelangelo-dev-secret";

export const login = async (email, password) => {
    const usuario = await getUsuarioByCorreo(email);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const contrasenaValida = usuario.password === password;
    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },
        jwtSecret(),
        { expiresIn: "1h" }
    );

    return {
        token,
        role: usuario.rol,
        usuario: {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
        },
    };
};

export const verificarToken = async (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret());
        const usuario = await getUsuarioById(decoded.id);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return usuario;
    } catch (error) {
        console.error("verificarToken falló:", error.message); //depurar el 401
        throw new Error("Token inválido");
    }
};