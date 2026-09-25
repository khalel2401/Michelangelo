/*
    Usamos la libreria faker para generar datos falsos para poblar el backend.

*/

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Limpiamos la base de datos antes de generar nuevos datos.
    // En PostgreSQL, deleteMany no reinicia la secuencia autoincremental,
    // por eso usamos TRUNCATE con RESTART IDENTITY para resetear los IDs.
    console.log('Limpiando la base de datos...');
    await prisma.$executeRaw`TRUNCATE TABLE "usuarios", "eventos" RESTART IDENTITY CASCADE;`;


    //generacion de datos falsos de usuario
    const cantidadUsuarios = 10; // Cambiar valor dependiendo de la cantidad de usuarios que se quieran generar
    
    console.log('Generando datos falsos de usuario...');
    const usuarios = await Promise.all(
        Array.from({ length: cantidadUsuarios }).map(() =>
            prisma.usuario.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 }),
                nombre: faker.person.firstName(),
                apellido: faker.person.lastName(),
                telefono: faker.phone.number(),
                rol: faker.helpers.arrayElement(['admin', 'cliente']),
            },
            })
        )
    );


    const cantidadEventos = 10; // Cambiar valor dependiendo de la cantidad de eventos que se quieran generar
    console.log('Generando datos falsos de evento...');
    const eventos = await Promise.all(
        Array.from({ length: cantidadEventos }).map(() =>
            prisma.evento.create({
            data: {
                nombre: faker.lorem.words(3),
                tipo: faker.helpers.arrayElement(['concierto', 'cumpleaños', 'deportivo', 'conferencia', 'otro']),
                fecha: faker.date.future(),
                cantidadPersonas: faker.number.int({ min: 10, max: 1000 }),
                valorTotal: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
                abono: parseFloat(faker.commerce.price({ min: 50, max: 5000 })),
                confirmado: faker.datatype.boolean(),
            },
            })
        )
    );


    console.log('Datos falsos generados exitosamente.');
    console.log('Usuarios generados:', usuarios);
    console.log('Eventos generados:', eventos);
    


    // seguir el mismo patron al añadir mas tablas de datos.
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });