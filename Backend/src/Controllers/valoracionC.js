import * as valoracionService from "../Services/valoracionS.js";

const manejarError =(fn)=> async (req, res, next)=>{
  try{
    await fn(req, res);
  }catch (err){
    if (err.status) return res.status(err.status).json({menssage: err.menssage});
    next(err);
  }
};

export const getValoraciones = manejarError(async(req, res)=>{
  res.status(200).json(await valoracionService.getValoraciones());
});

export const getMisValoraciones =manejarError(async(req, res)=>{
  res.status(200).json(await valoracionService.getValoracionesByAutor(req.usuario.id));
});

export const getValoracionPorId = manejar(async (req, res) => {
  res.status(200).json(await valoracionService.getValoracionById(req.params.id, req.usuario));
});

export const getValoracionesTrabajador = manejar(async (req, res) => {
  res.status(200).json(await valoracionService.getValoracionesDeTrabajador(req.params.id));
});

export const getValoracionesEvento = manejar(async (req, res) => {
  res.status(200).json(await valoracionService.getValoracionesDeTrabajador(req.params.id));
});



export const crearValoracion = manejarError(async(req, res)=> {
  res.status(201).json(await valoracionService.createValoracion(req.body, req.usuario));
});

export const actualizarValoracion = manejarError(async(req, res)=> {
  res.status(200).json(await valoracionService.updateValoracion(req.params.id, req.body, req.usuario));
});

export const eliminarValoracion = manejarError(async(req, res)=>{
  await valoracionService.deleteValoracion(req.params.id, req.usuario);
  res.status(200).json({message: 'Valoracion eliminada correctamente'});
})