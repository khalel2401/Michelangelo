import { z } from "zod";

export const tarjetaSchema = z.object({
  usuarioId: z.number().int().positive("El ID del usuario debe ser válido"),
  numero: z.string().max(16).min(16),
  cvv: z.string().max(3).min(3),
  fechaVencimiento: z.string().regex(/^\d{2}\/\d{2}$/),
  titular: z.string().max(255),
  tipo: z.enum(["credito", "debito"]),
});