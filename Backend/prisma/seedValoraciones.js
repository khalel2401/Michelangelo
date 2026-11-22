// Datos de prueba SOLO para desarrollar el módulo de valoraciones.
// Uso (desde /Backend):  node prisma/seedValoraciones.js
// No borra nada y puede correrse varias veces. Crea usuarios con clave conocida (123456).
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const dias = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

async function main() {
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@michelangelo.cl' },
    update: {},
    create: { email: 'admin@michelangelo.cl', password: '123456', nombre: 'Ada', apellido: 'Admin', rol: 'admin' },
  });
  const cliente = await prisma.usuario.upsert({
    where: { email: 'cliente@michelangelo.cl' },
    update: {},
    create: { email: 'cliente@michelangelo.cl', password: '123456', nombre: 'Carlos', apellido: 'Cliente', rol: 'cliente' },
  });

  // Tu backend solo deja valorar eventos que YA ocurrieron. El seed.js original crea fechas futuras,
  // por eso aquí creamos eventos en el pasado (y uno futuro para comprobar que NO aparece).
  // Cada Evento exige una Cotizacion propia (cotizacionId es @unique).
  const definiciones = [
    { nombre: 'Boda Los Pérez (pasado)', fecha: dias(-30) },
    { nombre: 'Cumpleaños de Sofía (pasado)', fecha: dias(-10) },
    { nombre: 'Concierto Verano (FUTURO)', fecha: dias(20) },
  ];
  const eventos = [];
  for (const def of definiciones) {
    let evento = await prisma.evento.findFirst({ where: { nombre: def.nombre } });
    if (!evento) {
      const cotizacion = await prisma.cotizacion.create({ data: { cantidadPersonas: 50, valorTotal: 1000000, abono: 500000 } });
      evento = await prisma.evento.create({ data: { nombre: def.nombre, fecha: def.fecha, cotizacionId: cotizacion.id } });
    }
    eventos.push(evento);
  }

  // El cliente ya valoró el primer evento, para que "Mis valoraciones" no salga vacío.
  const yaValoro = await prisma.valoracion.findFirst({ where: { autorId: cliente.id, eventoId: eventos[0].id } });
  if (!yaValoro) {
    await prisma.valoracion.create({ data: { autorId: cliente.id, eventoId: eventos[0].id, calificacion: 5, comentario: 'Todo salió perfecto' } });
  }

  console.log('Listo. Usuarios: admin@michelangelo.cl / cliente@michelangelo.cl  (clave: 123456)');
  console.log('Admin id:', admin.id, '| Cliente id:', cliente.id);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
