import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '@routes/userRoutes';
import reservationRoutes from '@routes/reservationRoutes';
import spaceRoutes from '@routes/spaceRoutes';
import roleRoutes from '@routes/roleRoutes';
import authRoutes from '@routes/auth/authRoutes';
import logger from '@middleware/logger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Usar las rutas
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/spaces', spaceRoutes);
app.use('/roles', roleRoutes);
app.use('/auth', authRoutes);

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

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
