import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { email, fullName, roleId } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        role: { connect: { id: roleId } },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta para obtener todos los espacios
app.get('/spaces', async (req, res) => {
  try {
    const spaces = await prisma.space.findMany();
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los espacios' });
  }
});

// Ruta para crear un nuevo espacio
app.post('/spaces', async (req, res) => {
  const { name, description, capacity } = req.body;
  try {
    const space = await prisma.space.create({
      data: {
        name,
        description,
        capacity,
      },
    });
    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el espacio' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
