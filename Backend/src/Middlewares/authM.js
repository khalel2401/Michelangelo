const { verificarToken } = require("../service/authS.js");
const extraerSesion = require("../Utils/extraerSesion.js");

export const verificarAuth = async(req, res, next) => {
    const usuario = await extraerSesion(req);

    if(!usuario){
        return res.statud(401).json({ message: "No autorizado"});
    }

    req.usuario = usuario;
    next()
};