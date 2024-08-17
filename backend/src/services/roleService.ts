import { PrismaClient, Reservation, Role, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateRole {
  id: number;
  name: string;
}

export const getAllRoles = async (): Promise<Role[]> => {
  return prisma.role.findMany();
};

export const getRoleById = async (id: number): Promise<Role | null> => {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    return role;
  } catch (error) {
    console.error(`Error fetching role with id ${id}:`, error);
    throw new Error('Could not retrieve the role');
  }
};

export const createRole = async (data: CreateRole): Promise<Role | null> => {
  try {
    const newRole = await prisma.role.create({ data });
    return newRole;
  } catch (error) {
    console.error(`Error creating a role ${data.toString()}`, error);
    throw new Error('Could not create role');
  }
};

export const updateRole = async (
  id: number,
  data: Partial<CreateRole>
): Promise<Role | null> => {
  try {
    const existingRole = await prisma.role.findUnique({ where: { id } });

    if (!existingRole) {
      console.warn(`Role with ID ${id} not found.`);
      return null;
    }
    const updateRole = await prisma.role.update({ where: { id }, data });
    return updateRole;
  } catch (error) {
    console.error(`Error updating role with ${id.toString()}`, error);
    throw new Error('Could not update role');
  }
};

export const deleteRole = async (id: number): Promise<Role | null> => {
  try {
    const existingRole = await prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      console.warn(`Role with ID ${id} not found.`);
      return null;
    }

    const deletedRole = await prisma.role.delete({ where: { id } });
    return deletedRole;
  } catch (error) {
    console.error(`Error deleting role with id ${id}:`, error);
    throw new Error('Could not delete role');
  }
};

export const getUsersByRole = async (role: Role): Promise<User[] | null> => {
  try {
    const existingRole = await prisma.role.findFirst({
      where: { id: role.id },
      include: {
        users: true,
      },
    });

    if (!existingRole) {
      console.warn(`Role not found.`);
      return null;
    }

    return existingRole.users;
  } catch (error) {
    console.error(`Error obatining users:`, error);
    throw new Error('Could not get users');
  }
};
