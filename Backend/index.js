import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './Routes/usuarioR.js';
import errorHandler from './Middlewares/errorM.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

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