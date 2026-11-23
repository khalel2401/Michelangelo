import { 
    getUsuarioByCorreo,
    getUsuarioById
} from "./usuarioS.js";
import jwt from "jsonwebtoken";

export const login = async (email, password) => {
    const usuario = await getUsuarioByCorreo(email);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const contrasenaValida = usuario.password === password;
    if (!contrasenaValida) {
        throw new Error("Contraseña incorrecta");
    }

    const jwtSecret = process.env.JWT_SECRET || "michelangelo-dev-secret";
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, jwtSecret, { expiresIn: "1h" });

    return { token, role: usuario.rol };
};

export const verificarToken = async (token) => {
    try {
        const jwtSecret = process.env.JWT_SECRET || "michelangelo-dev-secret";
        const decoded = jwt.verify(token, jwtSecret);
        const usuario = await getUsuarioById(decoded.id);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return usuario;
    } catch (error) {
        throw new Error("Token inválido");
    }
};