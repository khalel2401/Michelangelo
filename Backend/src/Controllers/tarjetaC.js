import * as tarjetaService from '../Services/tarjetaS.js';

export const crearTarjeta = async (req, res) => {
  try {
    const tarjeta = await tarjetaService.crearTarjeta(req.body);
    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerTarjetas = async (req, res) => {
  try {
    const tarjetas = await tarjetaService.obtenerTarjetas();
    res.status(200).json(tarjetas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerTarjetaPorUser = async (req, res) => {
  try {
    const tarjeta = await tarjetaService.obtenerTarjetaPorUser(req.params.id);
    res.status(200).json(tarjeta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const borrarTarjeta = async (req, res) => {
  try {
    const tarjeta = await tarjetaService.borrarTarjeta(req.params.id);
    res.status(200).json(tarjeta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};