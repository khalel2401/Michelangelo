import { z} from "zod";

export const usuarioSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  telefono: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  rol: z.enum(['admin', 'cliente','externo']),
});

export const updateUsuarioSchema = usuarioSchema.partial();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});