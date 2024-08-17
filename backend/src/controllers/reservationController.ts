import { Request, Response } from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  CreateReservationInput,
} from '../services/reservationService';

// Obtener todas las reservas
export const getAllReservationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Could not fetch reservations' });
  }
};

// Obtener una reserva por ID
export const getReservationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = parseInt(req.params.id);
    const reservation = await getReservationById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error(
      `Error fetching reservation with id ${req.params.id}:`,
      error
    );
    res.status(500).json({ error: 'Could not fetch reservation' });
  }
};

// Crear una nueva reserva
export const createReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationData: CreateReservationInput = req.body;
    const newReservation = await createReservation(reservationData);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Could not create reservation' });
  }
};

// Actualizar una reserva existente
export const updateReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = parseInt(req.params.id);
    const reservationData: Partial<CreateReservationInput> = req.body;
    const updatedReservation = await updateReservation(
      reservationId,
      reservationData
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error(
      `Error updating reservation with id ${req.params.id}:`,
      error
    );
    res.status(500).json({ error: 'Could not update reservation' });
  }
};

// Eliminar una reserva
export const deleteReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = parseInt(req.params.id);
    const deletedReservation = await deleteReservation(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(deletedReservation);
  } catch (error) {
    console.error(
      `Error deleting reservation with id ${req.params.id}:`,
      error
    );
    res.status(500).json({ error: 'Could not delete reservation' });
  }
};
