import { Reservation as PrismaReservation } from '@prisma/client';

export class ReservationImplementation implements PrismaReservation {
  id: number;
  userId: string;
  spaceId: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;

  constructor(reservation: PrismaReservation) {
    this.id = reservation.id;
    this.userId = reservation.userId;
    this.spaceId = reservation.spaceId;
    this.startTime = reservation.startTime;
    this.endTime = reservation.endTime;
    this.createdAt = reservation.createdAt;
  }
}
