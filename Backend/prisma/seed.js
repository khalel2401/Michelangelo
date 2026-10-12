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
    await prisma.$executeRaw`TRUNCATE TABLE "usuarios", "eventos", "articulos", "vehiculos" RESTART IDENTITY CASCADE;`;


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
                telefono: faker.phone.number({ style: 'international' }),
                rol: faker.helpers.arrayElement(['admin', 'cliente']),
            },
            })
        )
    );
    
    const cantidadServicios = 10;
    console.log('Generando datos falsos de servicio...');
    const servicios = await Promise.all(
        Array.from({ length: cantidadServicios }).map(() =>
            prisma.servicio.create({
                data: {
                    nombre: faker.commerce.product(),
                    precio: faker.number.int({ min: 50000, max: 300000 }),
                    descripcion: faker.lorem.sentence(),
                    activo: true,
                },
            })
        )
    );

    const cantidadPersonal = 10;
    console.log('Generando datos falsos de personal...');
    const personal = await Promise.all(
        Array.from({ length: cantidadPersonal }).map(() =>
            prisma.personal.create({
                data: {
                    nombre: faker.person.firstName(),
                    apellido: faker.person.lastName(),
                    telefono: faker.phone.number({ style: 'international' }),
                    calificacion: faker.number.int({ min: 1, max: 5 }),
                },
            })
        )
    );

    /*const cantidadEventos = 10; // Cambiar valor dependiendo de la cantidad de eventos que se quieran generar
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
                local: 
            },
            })
        )
    );*/

    const cantidadArticulos = 10; // Cambiar valor dependiendo de la cantidad de articulos que se quieran generar
    console.log('Generando datos falsos de articulo...');
    const articulos = await Promise.all(
        Array.from({ length: cantidadArticulos }).map(() =>
            prisma.articulo.create({
            data: {
                nombre: faker.commerce.productName(),
                cantidad: faker.number.int({ min: 1, max: 100 }),
                enUso: faker.datatype.boolean(),
            },
            })
        )
    );

    const cantidadVehiculos = 10; // Cambiar valor dependiendo de la cantidad de vehiculos que se quieran generar
    console.log('Generando datos falsos de vehiculo...');
    const vehiculos = await Promise.all(
        Array.from({ length: cantidadVehiculos }).map(() =>
            prisma.vehiculo.create({
            data: {
                marca: faker.vehicle.manufacturer(),
                modelo: faker.vehicle.model(),
                patente: faker.vehicle.vin(),
                disponible: faker.datatype.boolean(),
            },
            })
        )
    );


    const cantidadLocales = 10;
    console.log('Generando datos falsos de locales...');
    const locales = await Promise.all(
        Array.from({length: cantidadLocales}).map(() =>
            prisma.local.create({
                data: {
                    nombre: faker.lorem.words(3),
                    precio: parseInt(faker.commerce.price({min: 100, max: 100000})),
                    capacidad : parseInt(faker.commerce.price({min: 100, max: 100000})),
                    contacto: faker.phone.number({ style: 'international' }),
                    nombreDueno: faker.person.fullName(),
                    aforo: parseInt(faker.number.bigInt({min: 100, max: 10000})),
                    direccion: faker.location.streetAddress(),
                    disponibilidad: true,
                },
            })
        )
    );

 

    const cantidadEventos = 5;
    console.log('Generando datos falsos de evento...');
    const eventos = await Promise.all(
        Array.from({ length: cantidadEventos }).map((_, index) =>
            prisma.evento.create({
                data: {
                    nombre: `Evento ${faker.company.buzzPhrase()}`,
                    fecha: faker.date.future(),
                    cotizacionId: cotizaciones[index].id,
                },
            })
        )
    );


    const contrataciones = await Promise.all(
        eventos.map((evento, index) =>
            prisma.contratacion.create({
                data: {
                    id_personal: personal[index].id,
                    id_evento: evento.id,
                    fecha: faker.date.future().toISOString().split('T')[0],
                    salario: faker.number.int({ min: 30000, max: 100000 }),
                },
            })
        )
    );

    const cantidadCotizaciones = 10;
    console.log('Generando datos falsos de cotizaciones...');
    const cotizaciones = await Promise.all(
        Array.from({ length: cantidadCotizaciones }).map((_, index) => {
            const valorTotal = faker.number.int({ min: 500000, max: 3000000 });
            return prisma.cotizacion.create({
                data: {
                    localId: locales[index].id,
                    cantidadPersonas: faker.number.int({ min: 20, max: 300 }),
                    valorTotal: valorTotal,
                    abono: faker.number.int({ min: Math.ceil(valorTotal * 0.5), max: valorTotal }),
                    estado: faker.helpers.arrayElement(['pendiente', 'aprobada', 'finalizada']),
                },
            });
        })
    );

    console.log('Datos falsos generados exitosamente.');
    console.log('Usuarios generados:', usuarios);
    //console.log('Eventos generados:', eventos);
    console.log('Articulos generados:', articulos);
    console.log('Vehiculos generados:', vehiculos);

    

    
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