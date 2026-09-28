const { verificarToken } = require("../Services/authS.js");

export const extraerSesion = async (req) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startswith("Bearer")){
        return null;
    }

    const token = authHeader.split(" ")[1];

    try{
        const usuario = await verificarToken(token);
        return usuario;
    } catch(error){
        return null;
    }
};