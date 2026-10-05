import * as personalService from "../Services/personalS.js";

export const getPersonal = async (req, res) => {
    try {
        const personal = await personalService.getAllPersonal();
        res.status(200).json(personal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPersonalPorId = async (req, res) => {
    try {
        const personal = await personalService.getPersonalById(req.params.id);
        if (!personal) {
            return res.status(404).json({ message: "Personal no encontrado" });
        }
        res.status(200).json(personal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPersonalPorNombre = async (req, res) => {
    try {
        const personal = await personalService.getPersonalByNombre(req.params.nombre);  
        if (!personal) {
            return res.status(404).json({ message: "Personal no encontrado" });
        }
        res.status(200).json(personal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const crearPersonal = async (req, res) => {
    const personalData = req.body;
    console.log("hola papus");
    try {
        console.log("hola papus");

        const nuevoPersonal = await personalService.createPersonal(personalData);
        res.status(201).json(nuevoPersonal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const actualizarPersonal = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const personalActualizado = await personalService.updatePersonal(id, updatedFields);
        if (!personalActualizado) {
            return res.status(404).json({ message: "Personal no encontrado" });
        }
        res.status(200).json(personalActualizado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const eliminarPersonal = async (req, res) => {
  const { id } = req.params;
  try {
    const personalEliminado = await personalService.deletePersonal(id);
    if (!personalEliminado) {
      return res.status(404).json({ message: "Personal no encontrado" });
    }
    res.status(200).json({ message: "Personal eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
