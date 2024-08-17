import { PrismaClient, Reservation } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateReservationInput {
  userId: string;
  spaceId: number;
  startTime: Date;
  endTime: Date;
}

export const getAllReservations = async (): Promise<Reservation[]> => {
  return prisma.reservation.findMany();
};

export const getReservationById = async (
  id: number
): Promise<Reservation | null> => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });

    return reservation;
  } catch (error) {
    console.error(`Error fetching reservation with id ${id}:`, error);
    throw new Error('Could not retrieve the reservation');
  }
};

export const createReservation = async (
  data: CreateReservationInput
): Promise<Reservation | null> => {
  try {
    const newReservation = await prisma.reservation.create({ data });
    return newReservation;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Could not create reservation');
  }
};

export const updateReservation = async (
  id: number,
  data: Partial<CreateReservationInput>
): Promise<Reservation | null> => {
  try {
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!existingReservation) {
      console.warn(`Reservation with ID ${id} not found.`);
      return null;
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data,
    });

    return updatedReservation;
  } catch (error) {
    console.error(`Error updating reservation with id ${id}:`, error);
    throw new Error('Could not update reservation');
  }
};

export const deleteReservation = async (
  id: number
): Promise<Reservation | null> => {
  try {
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!existingReservation) {
      console.warn(`Reservation with ID ${id} not found.`);
      return null;
    }

    const deletedReservation = await prisma.reservation.delete({
      where: { id },
    });
    return deletedReservation;
  } catch (error) {
    console.error(`Error deleting reservation with id ${id}:`, error);
    throw new Error('Could not delete reservation');
  }
};

export const getReservationByUser = async (userId: string) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        space: true,
      },
    });
    return reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Could not fetch reservations');
  }
};
