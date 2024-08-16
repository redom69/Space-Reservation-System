import { User as PrismaUser, Role, Reservation } from '@prisma/client';

export interface User extends PrismaUser {
  getFullName(): string;
}

export interface User extends PrismaUser {
  reservations?: Reservation[];
}

export class UserImplementation implements User {
  id: string;
  email: string;
  fullName: string | null;
  roleId: number;
  createdAt: Date;
  role: Role | null;
  reservations?: Reservation[];

  constructor(
    user: PrismaUser & { reservations?: Reservation[] } & { role?: Role }
  ) {
    this.id = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
    this.roleId = user.roleId;
    this.createdAt = user.createdAt;
    this.role = user.role || null;
    this.reservations = user.reservations || [];
  }

  getFullName(): string {
    return this.fullName ?? '';
  }
}
