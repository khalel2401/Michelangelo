import { z } from "zod";

export const cotizacionSchema = z.object({
  cantidadPersonas: z.number().int().positive(),
  valorTotal: z.number(),
  abono: z.number(),
  estado: z.string().optional().default("pendiente"),
});

export const updateCotizacionSchema = cotizacionSchema.partial();