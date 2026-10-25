import prisma from '../Config/prisma.js';

const ROLES_TRABAJADOR = ['admin'];

const crearError = (status, message) => Object.assign(new Error(message), { status });

const incluir = {
  autor: {select: {id: true, nombre: true,apellido: true }},
  trabajador: {select: {id: true, nombre: true,apellido: true }},
  evento: {select: {id: true, nombre: true, fecha: true }},
};

const buscarEvento = async(id) => {
  const evento = await prisma.evento.findUnique({where: {id}});
  if (!evento) throw crearError(404, 'Evento no encontrado');
  return evento;
};

const buscarTrabajador = async(id)=> {
  const trabajador = await prisma.usuario.findUnique({where: {id}});
  if (!trabajador || !ROLES_TRABAJADOR.includes(trabajador.rol)){
    throw crearError(404, 'Trabajador no encontrado');
  }
  return trabajador;
};

const buscarValoracion = async(id)=> {
  const valoracion = await prisma.valoracion.findUnique({where: {id}, include: incluir});
  if(!valoracion) throw crearError(404, 'Valoracion no encontrada');
  return valoracion;
};

const verificarPermiso = (usuario, valoracion)=> {
  if (usuario.rol !== 'admin' && valoracion.autorId !== usuario.id){
    throw crearError(403,'No tienes permiso sobre esta valoracion');
  }
};

const resumen = async (where)=>{
  const [valoraciones, stats] = await Promise.all([prisma.valoracion.findMany({where, include: incluir, orderBy: {createdAt: 'desc'}}),
    prisma.valoracion.aggregate({where, _avg: {calificaion: true},
    _count: true}),
  ]);
  const promedio = stats._avg.calificaion;
  return{
    promedio: promedio === null ? null: Math.round(promedio*100)/100,
    total: stats._count,
    valoraciones,
  };
};

export const crearValoracion = async ({calificacion, comentario, trabajdorId, eventoId}, usuario)=> {
  if (trabajadorId !== undefined){
    if(trabajadorId === autor.id) {
      throw crearError(400, 'No puedes valorarte a ti mismo');
    } 
    await buscarTrabajador(trabajadorId);

  }else {
    const evento = await buscarEvento(eventoId);
    if(!evento.confirmado) {
      throw crearError(400, 'Error: Solo puedes valorar eventos confirmados');
    }
    if (evento.fecha > new Date()){
      throw crearError(400,'El evento aun no ocurre, no se puede valorar');
    }
  }

  try{
    return await prisma.valoracion.create({
      data: {calificacion, comentario, trabajadorId, eventoId, autorId: autor.id}, include: incluir
    });
  } catch (err){
    if(err.code === 'P2002'){
      throw crearError(400, 'Ya se ha realizado una valoracion para este evento o trabajador');
    }
    throw err;
  }
};

export const updateValoracion = async (id, datos, usuario)=> {
  const valoracion = await buscarValoracion(id);
  velificarPermiso(usuario, valoracion);
  return prisma.valoracion.update({
    where:{id},
    data: {calificacion, datos.calificacion, comentario: datos.comentario},
  });
};
