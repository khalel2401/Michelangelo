import * as localS from "../Services/localS.js";

export const getLocales = async (req, res) => {
	try {
		const result = await localS.getLocales();
		return res.status(200).json(result);
	} catch (err) {
        console.error(err);
        res.status(500).json({message: "Error interno del servidor"});
	}
};

export const getLocalPorId = async (req, res) => {
	try {
		const result = await localS.getLocalById(req.params.id);
		return res.status(200).json(result);
	} catch (err) {
        console.error(err);
        res.status(500).json({message: "Error interno del servidor"});
	}
};

export const getLocalPorNombreDueno = async (req, res) =>{
    try {
        const local = await localS.getLocalByNombreDueno(req.params.nombreDueno);
        if(!local){
            return res.status(404).json({message: "No se encontraron locales"});
        }
        res.status(200).json(local);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const crearLocal = async (req, res) => {
	try {
		const result = await localS.createLocal(req.body);
		return res.status(201).json(result);
	} catch (err) {
        console.error(err);
        res.status(500).json({message: "Error interno del servidor"});
	}
};

export const actualizarLocal = async (req, res) => {
	try {
		const result = await localS.updateLocal(req.params.id, req.body);
		return res.status(200).json(result);
	} catch (err) {
		throw err;
	}
};

export const eliminarLocal = async (req, res) => {
	try {
		const result = await localS.deleteLocal(req.params.id);
		return res.status(200).json(result);
	} catch (err) {
		throw err;
	}
};

