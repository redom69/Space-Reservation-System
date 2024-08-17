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
router.get('/', getAllUsersController);

// Obtener un usuario por ID
router.get('/user/:id', getUserByIdController);

// Crear un nuevo usuario
router.post('/user', createUserController);

// Actualizar un usuario existente
router.put('/user/:id', updateUserController);

// Eliminar un usuario
router.delete('/user/:id', deleteUserController);

// Obtener todas las reservas de un usuario
router.get('/user/:id/reservations', getUserReservationsController);

// Obtener el rol de un usuario
router.get('/user/:id/role', getUserRoleController);

export default router;
