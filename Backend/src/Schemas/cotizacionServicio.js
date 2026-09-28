import { z } from "zod";

export const cotizacionServicioSchema = z.object({
  cotizacionId: z.number().int().positive("El ID de la cotización debe ser válido"),
  servicioId: z.number().int().positive("El ID del servicio debe ser válido")
});

export const updateCotizacionServicioSchema = cotizacionServicioSchema.partial();