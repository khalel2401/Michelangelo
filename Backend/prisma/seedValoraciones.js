import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const dias = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

const usuario = (email, password, nombre, apellido, rol) =>
  prisma.usuario.upsert({
    where: { email },
    update: {},
    create: { email, password, nombre, apellido, rol },
  });

// Cada Evento exige una Cotizacion propia
async function evento(nombre, fecha) {
  let ev = await prisma.evento.findFirst({ where: { nombre } });
  if (!ev) {
    const cotizacion = await prisma.cotizacion.create({
      data: { cantidadPersonas: 50, valorTotal: 1000000, abono: 500000 },
    });
    ev = await prisma.evento.create({ data: { nombre, fecha, cotizacionId: cotizacion.id } });
  }
  return ev;
}

//Crea la valoración solo si ese autor aún no valoró ese evento
async function valorar({ autor, evento: ev, trabajador, calificacion, comentario }) {
  const where = ev
    ? { autorId: autor.id, eventoId: ev.id }
    : { autorId: autor.id, trabajadorId: trabajador.id };
  const existe = await prisma.valoracion.findFirst({ where });
  if (existe) return existe;
  return prisma.valoracion.create({ data: { ...where, calificacion, comentario } });
}

async function main() {
  // ---- Usuarios
  const test = await usuario('test@example.com', 'password123', 'Test', 'User', 'admin');
  const admin = await usuario('admin@michelangelo.cl', '123456', 'Ada', 'Admin', 'admin');
  const carlos = await usuario('cliente@michelangelo.cl', '123456', 'Carlos', 'Cliente', 'cliente');
  const camila = await usuario('cliente2@michelangelo.cl', '123456', 'Camila', 'Cliente', 'cliente');

  // ---- Eventos: 3 pasados(para probar ) 
  const boda = await evento('Boda Los Pérez (pasado)', dias(-30));
  const cumple = await evento('Cumpleaños de Sofía (pasado)', dias(-10));
  const aniversario = await evento('Aniversario Empresa (pasado)', dias(-5));
  await evento('Concierto Verano (FUTURO)', dias(20));

  // ---- Valoraciones de autores distintos
  await valorar({ autor: carlos, evento: boda, calificacion: 5, comentario: 'Todo salió perfecto' });
  await valorar({ autor: carlos, evento: cumple, calificacion: 4, comentario: 'Muy buena atención, faltó algo de puntualidad' });
  await valorar({ autor: carlos, trabajador: admin, calificacion: 5, comentario: 'Excelente coordinación' });

  await valorar({ autor: camila, evento: boda, calificacion: 4, comentario: 'Gran servicio, volveríamos a contratar' });
  await valorar({ autor: camila, trabajador: test, calificacion: 3, comentario: 'Cumplió, pero puede mejorar la comunicación' });

  await valorar({ autor: test, evento: boda, calificacion: 5, comentario: 'Evento muy bien organizado' });
  await valorar({ autor: test, trabajador: admin, calificacion: 5, comentario: 'Gran compañera de trabajo' });

  await valorar({ autor: admin, evento: cumple, calificacion: 4, comentario: 'Buen evento en general' });

  const total = await prisma.valoracion.count();
  console.log('\nListo. Valoraciones en la BD:', total);
  console.log('\nUsuarios para probar:');
  console.log('  admin    test@example.com           / password123');
  console.log('  admin    admin@michelangelo.cl      / 123456');
  console.log('  cliente  cliente@michelangelo.cl    / 123456   (3 valoraciones; le falta "Aniversario Empresa")');
  console.log('  cliente  cliente2@michelangelo.cl   / 123456   (2 valoraciones)');
  console.log('\nEvento pendiente para crear una valoración nueva:', aniversario.nombre);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());