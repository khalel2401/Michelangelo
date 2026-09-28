import { z } from "zod";

export const contratacionSchema = z.object({
    idPersonal: z.number().int(),
    idEvento: z.number().int(),
    fechaContratacion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD').optional(),
    salario: z.number().int().min(0,'El salario no puede estar en negativo').optional(),
});

export const updateContratacionSchema = contratacionSchema.partial();