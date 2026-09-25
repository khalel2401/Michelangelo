/*
    Usamos la libreria faker para generar datos falsos para poblar el backend.

*/

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Limpiamos la base de datos antes de generar nuevos datos
    // al ingresar otro tipo de datos, añadir linea para eliminar la tabla correspondiente
    console.log('Limpiando la base de datos...');
    await prisma.usuario.deleteMany();
    // y aca añadir los subsecuentes para cada tabla que se quiera limpiar antes de generar nuevos datos


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
    console.log('Datos generados:');
    console.log(usuarios);


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