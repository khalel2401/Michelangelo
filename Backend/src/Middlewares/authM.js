import { verificarToken } from "../Services/authS.js";
import  * as extraerSesion from "../Utils/extraerSesion.js";

export const verificarAuth = async(req, res, next) => {
    const usuario = await extraerSesion(req);

    if(!usuario){
        return res.statud(401).json({ message: "No autorizado"});
    }

    req.usuario = usuario;
    next()
};