import { PrismaClient, Reservation, Role, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateUserInput {
  email: string;
  fullName: string | null;
  roleId: number;
}

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        reservations: true,
      },
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user  with id ${id}:`, error);
    throw new Error('Could not retrieve user');
  }
};

export const createUser = async (
  data: CreateUserInput
): Promise<User | null> => {
  try {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create user');
  }
};

export const updateUser = async (
  id: string,
  data: Partial<CreateUserInput>
): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Could not update user');
  }
};

export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error('Could not delete user');
  }
};

export const getUserReservations = async (
  id: string
): Promise<Reservation[] | undefined> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        reservations: true,
      },
    });

    return user?.reservations;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create user');
  }
};

export const getUserRole = async (id: string): Promise<Role | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    return user?.role || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw new Error('Could not fetch user role');
  }
};
