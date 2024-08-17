import { Router } from 'express';
import {
  getAllReservationsController,
  getReservationByIdController,
  createReservationController,
  updateReservationController,
  deleteReservationController,
} from '../controllers/reservationController';

const router = Router();

// Obtener todas las reservas
router.get('/', getAllReservationsController);

// Obtener una reserva por ID
router.get('/reservation/:id', getReservationByIdController);

// Crear una nueva reserva
router.post('/reservation', createReservationController);

// Actualizar una reserva existente
router.put('/reservation/:id', updateReservationController);

// Eliminar una reserva
router.delete('/reservation/:id', deleteReservationController);

export default router;
