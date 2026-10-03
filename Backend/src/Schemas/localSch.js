import { z } from 'zod';

export const localSchema = z.object({
	nombre: z.string().min(2,'El nombre tener un minimo de 2 caracteres').max(100),
	precio: z.number().min(0, 'precio no puede ser 0'),
	contacto: z.string().min(8, 'Numero de telefono invalido').max(12,'Numero de telefono invalido'),
	nombreDueno: z.string().min(2, 'Nombre invalido').max(100),
	aforo: z.number().int().min(0, 'Aforo no puede ser 0'),
	direccion: z.string().min(5, 'Minimo de caracteres invalido').max(150),
	disponibilidad: z.boolean(),
});

export const localUpdateSchema = localSchema.partial();

