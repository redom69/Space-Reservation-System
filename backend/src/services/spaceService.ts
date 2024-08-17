import { PrismaClient, Space } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSpaceInput {
  name: string;
  description: string | null;
  capacity: number;
}

export const getAllSpaces = async (): Promise<Space[]> => {
  return prisma.space.findMany();
};

export const getSpaceById = async (id: number): Promise<Space | null> => {
  try {
    const space = await prisma.space.findUnique({
      where: { id },
      include: {
        reservations: true,
      },
    });

    return space;
  } catch (error) {
    console.error(`Error fetching space with id ${id}:`, error);
    throw new Error('Could not retrieve the space');
  }
};

export const createSpace = async (
  data: CreateSpaceInput
): Promise<Space | null> => {
  try {
    const newSpace = await prisma.space.create({ data });
    return newSpace;
  } catch (error) {
    console.error('Error creating space:', error);
    throw new Error('Could not create space');
  }
};

export const updateSpace = async (
  id: number,
  data: Partial<CreateSpaceInput>
): Promise<Space | null> => {
  try {
    const existingSpace = await prisma.space.findUnique({
      where: { id },
    });

    if (!existingSpace) {
      console.warn(`Space with ID ${id} not found.`);
      return null;
    }

    const updatedSpace = await prisma.space.update({
      where: { id },
      data,
    });

    return updatedSpace;
  } catch (error) {
    console.error(`Error updating space with id ${id}:`, error);
    throw new Error('Could not update space');
  }
};

export const deleteSpace = async (id: number): Promise<Space | null> => {
  try {
    const existingSpace = await prisma.space.findUnique({
      where: { id },
    });

    if (!existingSpace) {
      console.warn(`Space with ID ${id} not found.`);
      return null;
    }

    const deletedSpace = await prisma.space.delete({ where: { id } });
    return deletedSpace;
  } catch (error) {
    console.error(`Error deleting space with id ${id}:`, error);
    throw new Error('Could not delete space');
  }
};
