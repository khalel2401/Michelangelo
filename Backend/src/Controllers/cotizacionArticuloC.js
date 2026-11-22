import * as cotizacionArticuloService from '../Services/cotizacionArticuloS.js';

export const getCotizacionArticulos = async (req, res) => {
    try {
        const registros = await cotizacionArticuloService.getAllCotizacionArticulos();
        res.status(200).json(registros);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCotizacionArticuloPorId = async (req, res) => {
    try {
        const registro = await cotizacionArticuloService.getCotizacionArticuloById(req.params.id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json(registro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearCotizacionArticulo = async (req, res) => {
    const data = req.body;
    try {
        const nuevoRegistro = await cotizacionArticuloService.createCotizacionArticulo(data);
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarCotizacionArticulo = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const registroActualizado = await cotizacionArticuloService.updateCotizacionArticulo(id, updatedFields);
        if (!registroActualizado){
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.status(200).json(registroActualizado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const eliminarCotizacionArticulo = async (req, res) => {
  const { id } = req.params;
  try {
    const registroEliminado = await cotizacionArticuloService.deleteCotizacionArticulo(id);
    if (!registroEliminado) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.status(200).json({ message: "Registro eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};