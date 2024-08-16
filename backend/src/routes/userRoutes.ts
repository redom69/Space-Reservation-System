import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserReservationsController,
  getUserRoleController,
} from '../controllers/userController';

const router = Router();

// Obtener todos los usuarios
router.get('/users', getAllUsersController);

// Obtener un usuario por ID
router.get('/users/:id', getUserByIdController);

// Crear un nuevo usuario
router.post('/users', createUserController);

// Actualizar un usuario existente
router.put('/users/:id', updateUserController);

// Eliminar un usuario
router.delete('/users/:id', deleteUserController);

// Obtener todas las reservas de un usuario
router.get('/users/:id/reservations', getUserReservationsController);

// Obtener el rol de un usuario
router.get('/users/:id/role', getUserRoleController);

export default router;
