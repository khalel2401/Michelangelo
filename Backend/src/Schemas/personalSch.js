import { z } from "zod";

export const personalSchema = z.object({
    nombre: z.string().min(2, 'El nombre no puede ser menor a 2 caracteres').max(100),
    apellido: z.string().min(2, 'El apellido no puede ser menor a 2 caracteres').max(100),
    telefono: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
    calificacion: z.number().min(0, 'La calificación no puede ser menor a 0').max(5, 'La calificación no puede ser mayor a 5').optional(),
});

export const updatePersonalSchema = personalSchema.partial();