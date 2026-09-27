import { z } from 'zod';

export const eventoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  tipo: z.string().min(2, 'El tipo de evento es obligatorio').max(100),
  fecha: z.date({ invalid_type_error: 'Debe ingresar una fecha válida' }),
  cantidadPersonas: z.int().positive('La cantidad debe ser mayor a 0'),
  valorTotal: z.number().positive('El valor total debe ser un monto positivo'),
  abono: z.number().min(0, 'El abono no puede ser negativo'),
  confirmado: z.boolean().optional().default(false),
}).refine((datos) => datos.abono >= datos.valorTotal * 0.5, {
  message: 'No se puede guardar el evento: el abono debe ser de al menos el 50% del valor total',
  path: ['abono'], 
});

export const updateEventoSchema = eventoSchema;