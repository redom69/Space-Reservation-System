import { Router } from 'express';
import {
  getAllSpacesController,
  getSpaceByIdController,
  createSpaceController,
  updateSpaceController,
  deleteSpaceController,
} from '../controllers/spaceController';

const router = Router();

// Obtener todos los espacios
router.get('/', getAllSpacesController);

// Obtener un espacio por ID
router.get('/space/:id', getSpaceByIdController);

// Crear un nuevo espacio
router.post('/space', createSpaceController);

// Actualizar un espacio existente
router.put('/space/:id', updateSpaceController);

// Eliminar un espacio
router.delete('/space/:id', deleteSpaceController);

export default router;
