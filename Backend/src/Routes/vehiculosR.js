import { Router } from "express";

import {
    getVehiculos,
    getVehiculoPorId,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
} from "../Controllers/vehiculoC.js";

import {
    vehiculoSchema,
    updateVehiculoSchema
} from "../Schemas/vehiculoSch.js";

import { validateSchema } from "../Middlewares/validarM.js";


const router = Router();

router.get("/vehiculos", getVehiculos);
router.post("/vehiculos", validateSchema(vehiculoSchema), crearVehiculo);
router.get("/vehiculos/:id", getVehiculoPorId);
router.put("/vehiculos/:id", validateSchema(updateVehiculoSchema), actualizarVehiculo);
router.delete("/vehiculos/:id", eliminarVehiculo);



export default router;