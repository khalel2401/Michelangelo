import { extraerSesion } from "../Utils/extraerSesion.js";

export const verificarAuth = async(req, res, next) => {
    const usuario = await extraerSesion(req);

    if(!usuario){
        return res.status(401).json({ message: "No autorizado"});
    }

    req.usuario = usuario;
    next()
};