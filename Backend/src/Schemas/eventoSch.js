import { z } from "zod";

export const eventoSchema = z.object({
  nombre: z.string().min(1),
  local: z.string().min(1),
  fecha: z.string().datetime(),
  cotizacionId: z.number().int().positive(),
});

export const updateEventoSchema = eventoSchema.partial();