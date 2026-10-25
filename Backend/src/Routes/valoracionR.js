import { Router } from 'express';

import {
  getValoraciones,
  getMisValoraciones,
  getValoracionPorId,
  crearValoracion,
  actualizarValoracion,
  eliminarValoracion
} from "../Controllers/valoracionC.js";

import {
  valoracionSchema,
  updateValoracionSchema,
  idParamsSchema
} from "../Schemas/valoracionSch.js";

import { validateSchema } from "../Middlewares/validarM.js";
import { verificarAuth } from "../Middlewares/authM.js";

const router = Router();

router.use("/valoraciones", verificarAuth);

const soloAdmin = (req, res, next)=>{
  if (req.usuario.rol !== 'admin'){
    return res.status(403).json({menssage: 'No tienes permiso para realizar esta acción, solo un administrador'});
  }
}

router.get('/valoraciones', soloAdmin, getValoraciones);
router.get('/valoraciones/misValoraciones', getMisValoraciones);
router.get('/valoraciones/trabajadores/id', soloAdmin, validateSchema(idParamsSchema, 'params'), getValoracionesTrabajador);
router.get('/valoraciones/eventos/:id', soloAdmin, validateSchema(idParamsSchema, 'params'), getValoracionesEvento);
router.get('/valoraciones/:id', validateSchema(idParamsSchema, 'params'), getValoracionPorId);

router.post('/valoraciones', validateSchema(valoracionSchema), crearValoracion);
router.put('/valoraciones/:id', validateSchema(idParamsSchema, 'params'), validateSchema(updateValoracionSchema), actualizarValoracion);
router.delete('/valoraciones/:id', validateSchema(idParamsSchema, 'params'), eliminarValoracion);
export default router;