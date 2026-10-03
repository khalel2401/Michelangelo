import * as articuloService from '../Services/articuloS.js';

export const getArticulos = async (req, res) => {
    try {
        const articulos = await articuloService.getAllArticulos();
        res.status(200).json(articulos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getArticuloPorId = async (req, res) => {
    try {
        const articulo = await articuloService.getArticuloById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(articulo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearArticulo = async (req, res) => {
    const articuloData = req.body;
    try {
        const nuevoArticulo = await articuloService.createArticulo(articuloData);
        res.status(201).json(nuevoArticulo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarArticulo = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const articuloActualizado = await articuloService.updateArticulo(id, updatedFields);
        if (!articuloActualizado){
            return res.status(404).json({ message: "articulo no encontrado "});
        }
        res.status(200).json(articuloActualizado);
    } catch (err) {
        console.error(err);

    }
};

export const eliminarArticulo = async (req, res) => {
  const { id } = req.params;
  try {
    const articuloEliminado = await articuloService.deleteArticulo(id);
    if (!articuloEliminado) {
      return res.status(404).json({ message: "articulo no encontrado" });
    }
    res.status(200).json({ message: "articulo eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};