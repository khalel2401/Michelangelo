import * as vehiculoService from '../Services/vehiculoS.js';

export const getVehiculos = async (req, res) => {
    try {
        const vehiculos = await vehiculoService.getAllVehiculos();
        res.status(200).json(vehiculos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getVehiculoPorId = async (req, res) => {
    try {
        const vehiculo = await vehiculoService.getVehiculoById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
        res.status(200).json(vehiculo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearVehiculo = async (req, res) => {
    const vehiculoData = req.body;
    try {
        const nuevoVehiculo = await vehiculoService.createVehiculo(vehiculoData);
        res.status(201).json(nuevoVehiculo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const actualizarVehiculo = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const vehiculoActualizado = await vehiculoService.updateVehiculo(id, updatedFields);
        if (!vehiculoActualizado){
            return res.status(404).json({ message: "vehiculo no encontrado "});
        }
        res.status(200).json(vehiculoActualizado);
    } catch (err) {
        console.error(err);

    }
};

export const eliminarVehiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const vehiculoEliminado = await vehiculoService.deleteVehiculo(id);
    if (!vehiculoEliminado) {
      return res.status(404).json({ message: "vehiculo no encontrado" });
    }
    res.status(200).json({ message: "vehiculo eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};