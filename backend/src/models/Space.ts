import { Space as PrismaSpace, Reservation, Space } from '@prisma/client';

export class SpaceImplementation implements Space {
  id: number;
  name: string;
  description: string | null;
  capacity: number;
  createdAt: Date;
  reservations: Reservation[];

  constructor(space: PrismaSpace & { reservations?: Reservation[] }) {
    this.id = space.id;
    this.name = space.name;
    this.description = space.description;
    this.capacity = space.capacity;
    this.createdAt = space.createdAt;
    this.reservations = space.reservations || [];
  }
}
