import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import usuarioRoutes from './src/Routes/usuarioR.js';
import eventoRoutes from './src/Routes/eventoR.js';
import localRoutes from './src/Routes/localR.js';
import articuloRoutes from './src/Routes/articuloR.js';
import valoracionesRoutes from './src/Routes/valoracionR.js';
import authRoutes from './src/Routes/authR.js';
import servicioRoutes from './src/Routes/serviciosR.js';
import cotizacionRoutes from './src/Routes/cotizacionR.js';
import vehiculoRoutes from './src/Routes/vehiculosR.js';
import personalRoutes from './src/Routes/personalR.js';
import contratacionRoutes from './src/Routes/contratacionR.js';
import cotizacionServicio from "./src/Routes/cotizacionServicioR.js";
import cotizacionArticuloRoutes from "./src/Routes/cotizacionArticuloR.js"; // <-- NUEVA RUTA AGREGADA
import errorHandler from './src/Middlewares/errorM.js';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use(usuarioRoutes);
app.use(eventoRoutes);
app.use(localRoutes);
app.use(articuloRoutes);
app.use(vehiculoRoutes);
app.use(valoracionesRoutes);
app.use(authRoutes);
app.use(servicioRoutes);
app.use(cotizacionRoutes);
app.use(contratacionRoutes);
app.use(personalRoutes);
app.use(cotizacionArticuloRoutes); // <-- NUEVA RUTA EN USO

// Rutas con prefijo
app.use("/api/cotizaciones-servicios", cotizacionServicio);

// Middleware de manejo de errores (siempre va al final de las rutas)
app.use(errorHandler);

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});