import {z} from 'zod';

export const rolValoracionEnum = z.enum(['empleado', 'local', 'cliente']);
//calificaciones entre 1 y 5 enteros y 1000 de texto como maximo 
export const valoracionSchema = z.object({
  calificacion: z
    .number()
    .int()
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  comentario: z
    .string()
    .min(1, 'El comentario no puede estar vacío')
    .max(1000, 'El comentario es demasiado largo'),
  rol: rolValoracionEnum,
  objetivoId: z
    .number()
    .int()
    .positive('Debe indicar el id de la entidad evaluada (empleado, local o cliente)'),
  autorId: z
    .number()
    .int()
    .positive('Debe indicar el usuario que realiza la valoración'),
  eventoId: z.number().int().positive().optional(),
});

export const updateValoracionSchema = valoracionSchema.partial();