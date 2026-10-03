import { z } from "zod";

export const servicioSchema = z.object({
  nombre: z.string().min(1).max(100),
  precio: z.number().positive(),
  descripcion: z.string().max(200).optional(),
  activo: z.boolean().optional().default(false),
});

export const updateServicioSchema = servicioSchema.partial();