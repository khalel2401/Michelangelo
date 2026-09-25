import * as usuarioService from "../Services/usuarioS.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUsuarioPorNombre = async (req, res) => {
  const { nombre } = req.params;
    try {
    const usuario = await usuarioService.getUsuarioByNombre(nombre);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const crearUsuario = async (req, res) => {
  const usuarioData = req.body;
  try {
    const nuevoUsuario = await usuarioService.createUsuario(usuarioData);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const usuarioActualizado = await usuarioService.updateUsuario(id, updatedFields);
    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuarioActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioEliminado = await usuarioService.deleteUsuario(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};