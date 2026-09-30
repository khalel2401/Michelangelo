import { Router } from "express";
import {
    getLocales,
    getLocalPorId,
    crearLocal,
    actualizarLocal,
    eliminarLocal,
    getLocalPorNombreDueno
} from "../Controllers/localC.js";

import {
    localSchema,
    localUpdateSchema
} from "../Schemas/localSch.js";

import { validateSchema } from "../Middlewares/validarM.js";
import { getLocalesDisponibles } from "../Services/localS.js";

const router = Router();

router.get("/local",getLocales);
router.post("/local",validateSchema(localSchema), crearLocal);
router.get("/local/:id",getLocalPorId);
router.get("/local/disponibilidad/",getLocalesDisponibles);
router.get("/local/nombreDueno/:nombreDueno", getLocalPorNombreDueno);
router.put("/local/:id",validateSchema(localUpdateSchema), actualizarLocal);
router.delete("/local/:id", eliminarLocal);

export default router;