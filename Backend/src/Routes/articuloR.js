import { Router } from "express";
import {
    getArticulos,
    getArticuloPorId,
    crearArticulo,
    actualizarArticulo,
    eliminarArticulo
} from "../Controllers/articuloC.js";

import {
    articuloSchema,
    updateArticuloSchema
} from "../Schemas/articuloSch.js";

import { validateSchema } from "../Middlewares/validarM.js";


const router = Router();

router.get("/articulos", getArticulos);
router.post("/articulos", validateSchema(articuloSchema), crearArticulo);
router.get("/articulos/:id", getArticuloPorId);
router.get("/articulos/:id", validateSchema(updateArticuloSchema), actualizarArticulo);
router.get("/articulos/:id", eliminarArticulo);



export default router;