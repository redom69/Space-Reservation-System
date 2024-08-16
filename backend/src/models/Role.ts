import { Role as PrismaRole, User } from '@prisma/client';

export class RoleImplementation implements PrismaRole {
  id: number;
  name: string;
  users?: User[];

  constructor(role: PrismaRole & { users?: User[] }) {
    this.id = role.id;
    this.name = role.name;
    this.users = role.users || [];
  }
}
