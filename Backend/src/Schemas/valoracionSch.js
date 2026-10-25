import { z } from 'zod';

const id = z.number().int().positive().max(2147483647);

const calificacion = z
  .number({ error: 'La calificación debe ser un número' })
  .int('La calificación debe ser un número entero')
  .min(1, 'La calificación mínima es 1')
  .max(5, 'La calificación máxima es 5');

const comentario = z
  .string({ error: 'El comentario debe ser texto' })
  .trim()
  .min(1, 'El comentario no puede estar vacío')
  .max(1000, 'El comentario no puede superar los 1000 caracteres');

export const valoracionSchema = z
  .object({
    calificacion,
    comentario: comentario.optional(),
    trabajadorId: id.optional(),
    eventoId: id.optional(),
  })
  .refine((d) => (d.trabajadorId === undefined) !== (d.eventoId === undefined), {
    message: 'Debes indicar trabajadorId o eventoId (solo uno de los dos)',
    path: ['trabajadorId'],
  });

export const updateValoracionSchema = z
  .object({
    calificacion: calificacion.optional(),
    comentario: comentario.optional(),
  })

  .refine((d) => d.calificacion !== undefined || d.comentario !== undefined, {
    message: 'Debes enviar calificacion o comentario para actualizar',
  });