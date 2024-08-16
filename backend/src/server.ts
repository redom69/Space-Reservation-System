// src/server.ts
import express from 'express';
import useUser from './routes/userRoutes';
import useReservation from './routes/reservartionRoutes';
import useSpace from './routes/spaceRoutes';
import useRole from './routes/useRole';

const app = express();

app.use(express.json());

// Usar las rutas
app.use('/user', useUser);

app.use('/reservation', useReservation);

app.use('/space', useSpace);

app.use('/role', useRole);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
