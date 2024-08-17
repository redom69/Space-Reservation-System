import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import reservationRoutes from './routes/reservationRoutes';
import spaceRoutes from './routes/spaceRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/auth/authRoutes';
import logger from './middleware/logger';
import { adminOnly } from './middleware/adminMiddleware';
import { PrismaClient } from '@prisma/client';
import serverless from 'serverless-http'; // Importa serverless-http

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Usar las rutas
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/spaces', spaceRoutes);
app.use('/roles', roleRoutes);
app.use('/auth', authRoutes, adminOnly);

// Middleware de manejo de errores
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
);

// Verificar la conexión a la base de datos
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Conectado a la base de datos exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir si no se puede conectar
  }
}

// Llamar a la función de conexión
connectToDatabase();

// Si estás en un entorno local, inicia el servidor
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

// Exportar como función serverless para Netlify
export const handler = serverless(app);
