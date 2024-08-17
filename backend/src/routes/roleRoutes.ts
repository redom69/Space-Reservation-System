import { Router } from 'express';
import {
  getAllRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
  getUsersByRoleController,
} from '../controllers/roleController';

const router = Router();

// Obtener todos los roles
router.get('/', getAllRolesController);

// Obtener un rol por ID
router.get('/role/:id', getRoleByIdController);

// Crear un nuevo rol
router.post('/role', createRoleController);

// Actualizar un rol existente
router.put('/role/:id', updateRoleController);

// Eliminar un rol
router.delete('/role/:id', deleteRoleController);

// Obtener todos los usuarios asociados a un rol
router.get('/role/:id/users', getUsersByRoleController);

export default router;
