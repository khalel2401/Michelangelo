
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
    await prisma.$executeRaw`TRUNCATE TABLE "usuarios", "eventos", "valoraciones", "articulos", "vehiculos", "locales", "servicios", "Personal", "Contratacion", "cotizaciones", "cotizaciones_servicios" RESTART IDENTITY CASCADE;`;
    


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
    const usuarioEjemplo = await prisma.usuario.create({
        data:{
            email: 'test@example.com',
            password: 'password123',
            nombre: 'Test',
            apellido: 'User',
            telefono: '+1234567890',
            rol: 'admin'
        }
    });
    usuarios.push(usuarioEjemplo);
    
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
                    contacto: faker.phone.number({ style: 'international' }),
                    nombreDueno: faker.person.fullName(),
                    aforo: parseInt(faker.number.bigInt({min: 100, max: 10000})),
                    direccion: faker.location.streetAddress(),
                    disponibilidad: true,
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

    const cotizacionesServicios = await prisma.cotizacionServicio.createMany({
        data: cotizaciones.map((cotizacion, index) => ({
            cotizacionId: cotizacion.id,
            servicioId: servicios[index % servicios.length].id,
        })),
    });

 
    
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

    console.log('Generando un ejemplo relacionado para cada modelo...');
    const servicioEjemplo = await prisma.servicio.create({
        data: {
            nombre: 'Servicio de catering de ejemplo',
            precio: 150000,
            descripcion: 'Servicio de catering para eventos',
            activo: true,
        },
    });

    const personalEjemplo = await prisma.personal.create({
        data: {
            nombre: 'Alex',
            apellido: 'Ejemplo',
            telefono: '+56912345678',
            calificacion: 5,
        },
    });

    const articuloEjemplo = await prisma.articulo.create({
        data: {
            nombre: 'Articulo de ejemplo',
            cantidad: 10,
            enUso: false,
        },
    });

    const vehiculoEjemplo = await prisma.vehiculo.create({
        data: {
            marca: 'Toyota',
            modelo: 'Hiace',
            patente: 'EJMP-01',
            disponible: true,
        },
    });

    const localEjemplo = await prisma.local.create({
        data: {
            nombre: 'Salon de Eventos Ejemplo',
            precio: 250000,
            contacto: '+56912345678',
            nombreDueno: 'Dueno Ejemplo',
            aforo: 100,
            direccion: 'Avenida Ejemplo 123',
            disponibilidad: true,
        },
    });

    const cotizacionEjemplo = await prisma.cotizacion.create({
        data: {
            localId: localEjemplo.id,
            cantidadPersonas: 50,
            valorTotal: 500000,
            abono: 250000,
            estado: 'aprobada',
        },
    });

    const cotizacionServicioEjemplo = await prisma.cotizacionServicio.create({
        data: {
            cotizacionId: cotizacionEjemplo.id,
            servicioId: servicioEjemplo.id,
        },
    });

    const eventoEjemplo = await prisma.evento.create({
        data: {
            nombre: 'Evento de ejemplo',
            fecha: new Date('2026-01-15T18:00:00.000Z'),
            cotizacionId: cotizacionEjemplo.id,
        },
    });

    const contratacionEjemplo = await prisma.contratacion.create({
        data: {
            id_personal: personalEjemplo.id,
            id_evento: eventoEjemplo.id,
            fecha: '2026-01-15',
            salario: 50000,
        },
    });

    const valoracionEjemplo = await prisma.valoracion.create({
        data: {
            calificacion: 5,
            comentario: 'Excelente servicio de ejemplo',
            autorId: usuarioEjemplo.id,
            eventoId: eventoEjemplo.id,
        },
    });

    
    console.log('Datos falsos generados exitosamente.');
    console.log('Usuarios generados:', usuarios);
    console.log('Servicios generados:', servicios);
    console.log('Personal generado:', personal);
    console.log('Locales generados:', locales);
    console.log('Cotizaciones generadas:', cotizaciones);
    console.log('Relaciones cotización-servicio generadas:', cotizacionesServicios.count);
    console.log('Eventos generados:', eventos);
    console.log('Contrataciones generadas:', contrataciones);
    console.log('Articulos generados:', articulos);
    console.log('Vehiculos generados:', vehiculos);
    console.log('IDs de ejemplos creados:', {
        usuario: usuarioEjemplo.id,
        servicio: servicioEjemplo.id,
        local: localEjemplo.id,
        cotizacion: cotizacionEjemplo.id,
        cotizacionServicio: cotizacionServicioEjemplo.id,
        evento: eventoEjemplo.id,
        personal: personalEjemplo.id,
        contratacion: contratacionEjemplo.id,
        articulo: articuloEjemplo.id,
        vehiculo: vehiculoEjemplo.id,
        valoracion: valoracionEjemplo.id,
    });

    

    
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