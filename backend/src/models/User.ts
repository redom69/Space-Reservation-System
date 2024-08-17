import { User as PrismaUser, Reservation } from '@prisma/client';

export interface User extends PrismaUser {
  getFullName(): string;
}

export interface User extends PrismaUser {
  reservations?: Reservation[];
}

export class UserImplementation implements User {
  id: string;
  email: string;
  fullName: string;
  roleId: number;
  password: string;
  createdAt: Date;

  constructor(
    id: string,
    email: string,
    fullName: string,
    roleId: number,
    password: string
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.roleId = roleId;
    this.password = password;
    this.createdAt = new Date(); // Corrige la inicialización de createdAt
  }
  getFullName(): string {
    throw new Error('Method not implemented.');
  }
  reservations?:
    | {
        id: number;
        userId: string;
        spaceId: number;
        startTime: Date;
        endTime: Date;
        createdAt: Date;
      }[]
    | undefined;
}
