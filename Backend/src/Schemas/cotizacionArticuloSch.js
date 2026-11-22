import { z } from 'zod';

export const cotizacionArticuloSchema = z.object({
    id: z.number().int().positive().optional(),
    cotizacionId: z.number().int().positive('El ID de la cotización debe ser un número válido'),
    articuloId: z.number().int().positive('El ID del artículo debe ser un número válido'),
    cantidadAsignada: z.number().int().positive('La cantidad asignada debe ser mayor a 0').default(1),
});

export const updateCotizacionArticuloSchema = z.object({
    cotizacionId: z.number().int().positive().optional(),
    articuloId: z.number().int().positive().optional(),
    cantidadAsignada: z.number().int().positive('La cantidad asignada debe ser mayor a 0').optional(),
});