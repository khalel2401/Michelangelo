import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import usuarioRoutes from './src/Routes/usuarioR.js';
import eventoRoutes from './src/Routes/eventoR.js';
import servicioRoutes from './src/Routes/servicios.js';
import cotizacionRoutes from './src/Routes/cotizacion.js';
import articuloRoutes from './src/Routes/articuloR.js';
import authRoutes from './src/Routes/authR.js';
import errorHandler from './src/Middlewares/errorM.js';


const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(eventoRoutes);
app.use(servicioRoutes);
app.use(cotizacionRoutes);

app.use(articuloRoutes);
app.use(authRoutes);
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