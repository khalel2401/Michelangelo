import { z } from 'zod';

export const rolValoracionEnum = z.enum(['empleado', 'local', 'cliente']);

const idSchema = z.number().int().positive().max(2147483647);



export const valoracionSchema = z.object({
  calificacion: z
    .number()
    .int()
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  comentario: z
    .string()
    .trim() //no comentarios de solo espacios
    .min(1, 'El comentario no puede estar vacío')
    .max(1000, 'El comentario es demasiado largo'),
  rol: rolValoracionEnum,
  objetivoId: idSchema,
  eventoId: idSchema.optional(),
});


export const updateValoracionSchema = valoracionSchema
  .pick({ calificacion: true, comentario: true })
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe enviar calificacion o comentario para actualizar',
  });

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive().max(2147483647),
});

// Valida /valoraciones/objetivo/:rol/:objetivoId
export const objetivoParamsSchema = z.object({
  rol: rolValoracionEnum,
  objetivoId: z.coerce.number().int().positive().max(2147483647),
});
