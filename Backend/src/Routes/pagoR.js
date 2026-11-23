import { Router } from "express";
import {
  pagarCotizacion,
  obtenerPagos
} from "../Controllers/pagoC.js";

import { verificarAuth } from "../Middlewares/authM.js";

const router = Router();

router.use("/pagos", verificarAuth);
router.post("/pagos", pagarCotizacion);
router.get("/pagos", obtenerPagos);

export default router;