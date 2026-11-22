import { Router } from "express";
import {
    getCotizacionArticulos,
    getCotizacionArticuloPorId,
    crearCotizacionArticulo,
    actualizarCotizacionArticulo,
    eliminarCotizacionArticulo
} from "../Controllers/cotizacionArticuloC.js";

import {
    cotizacionArticuloSchema,
    updateCotizacionArticuloSchema
} from "../Schemas/cotizacionArticuloSch.js";

import { validateSchema } from "../Middlewares/validarM.js";


const router = Router();

router.get("/cotizaciones-articulos", getCotizacionArticulos);
router.post("/cotizaciones-articulos", validateSchema(cotizacionArticuloSchema), crearCotizacionArticulo);
router.get("/cotizaciones-articulos/:id", getCotizacionArticuloPorId);
router.put("/cotizaciones-articulos/:id", validateSchema(updateCotizacionArticuloSchema), actualizarCotizacionArticulo);
router.delete("/cotizaciones-articulos/:id", eliminarCotizacionArticulo);

export default router;