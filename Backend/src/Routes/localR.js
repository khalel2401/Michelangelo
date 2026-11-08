import { Router } from "express";
import {
    getLocales,
    getLocalPorId,
    crearLocal,
    actualizarLocal,
    eliminarLocal,
    getLocalPorNombreDueno,
    getLocalPorDisponibilidad
} from "../Controllers/localC.js";

import {
    localSchema,
    localUpdateSchema
} from "../Schemas/localSch.js";

import { validateSchema } from "../Middlewares/validarM.js";


const router = Router();

router.get("/local",getLocales);
router.post("/local",validateSchema(localSchema), crearLocal);
router.get("/local/disponibilidad/", getLocalPorDisponibilidad);
router.get("/local/nombreDueno/:nombreDueno", getLocalPorNombreDueno);
router.get("/local/:id",getLocalPorId);
router.put("/local/:id",validateSchema(localUpdateSchema), actualizarLocal);
router.delete("/local/:id", eliminarLocal);

export default router;