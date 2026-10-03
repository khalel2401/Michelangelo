import { z } from 'zod';

export const vehiculoSchema = z.object({
    id: z.number().int().positive().optional(),
    marca: z.string().min(2, 'La marca debe tener al menos 2 caracteres').max(100),
    modelo: z.string().min(2, 'El modelo debe tener al menos 2 caracteres').max(100),
    patente: z.string().min(2, 'La patente debe tener al menos 2 caracteres').max(100),
    disponible: z.boolean().optional().default(false),
});

export const updateVehiculoSchema = vehiculoSchema;