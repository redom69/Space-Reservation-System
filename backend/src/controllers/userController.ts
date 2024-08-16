import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserReservations,
  getUserRole,
  CreateUserInput,
} from '../services/usersServices';

// Obtener todos los usuarios
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Could not fetch users' });
  }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Could not fetch user' });
  }
};

// Crear un nuevo usuario
export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserInput = req.body; // Asegúrate de validar la entrada
    const newUser = await createUser(userData);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
};

// Actualizar un usuario existente
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData: Partial<CreateUserInput> = req.body; // Asegúrate de validar la entrada
    const updatedUser = await updateUser(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Could not update user' });
  }
};

// Eliminar un usuario
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Could not delete user' });
  }
};

// Obtener todas las reservas de un usuario
export const getUserReservationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id;
    const reservations = await getUserReservations(userId);

    if (!reservations) {
      return res.status(404).json({ error: 'Reservations not found' });
    }

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    res.status(500).json({ error: 'Could not fetch reservations' });
  }
};

// Obtener el rol de un usuario
export const getUserRoleController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const role = await getUserRole(userId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ error: 'Could not fetch role' });
  }
};
