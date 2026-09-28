import { z } from 'zod';

export const articuloSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
    cantidad: z.number().int().positive('La cantidad debe ser mayor a 0'),
    enUso: z.boolean().optional().default(false),
}).refine((datos) => datos.cantidad >= 1, {
    message: 'No se puede guardar el artículo: la cantidad debe ser al menos 1',
});

export const updateArticuloSchema = articuloSchema;