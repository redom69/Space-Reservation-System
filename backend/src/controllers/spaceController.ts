import { Request, Response } from 'express';
import {
  getAllSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace,
  CreateSpaceInput,
} from '../services/spaceService';

// Obtener todos los espacios
export const getAllSpacesController = async (req: Request, res: Response) => {
  try {
    const spaces = await getAllSpaces();
    res.json(spaces);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    res.status(500).json({ error: 'Could not fetch spaces' });
  }
};

// Obtener un espacio por ID
export const getSpaceByIdController = async (req: Request, res: Response) => {
  try {
    const spaceId = parseInt(req.params.id);
    const space = await getSpaceById(spaceId);

    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    res.json(space);
  } catch (error) {
    console.error(`Error fetching space with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not fetch space' });
  }
};

// Crear un nuevo espacio
export const createSpaceController = async (req: Request, res: Response) => {
  try {
    const spaceData: CreateSpaceInput = req.body;
    const newSpace = await createSpace(spaceData);

    res.status(201).json(newSpace);
  } catch (error) {
    console.error('Error creating space:', error);
    res.status(500).json({ error: 'Could not create space' });
  }
};

// Actualizar un espacio existente
export const updateSpaceController = async (req: Request, res: Response) => {
  try {
    const spaceId = parseInt(req.params.id);
    const spaceData: Partial<CreateSpaceInput> = req.body;
    const updatedSpace = await updateSpace(spaceId, spaceData);

    if (!updatedSpace) {
      return res.status(404).json({ error: 'Space not found' });
    }

    res.json(updatedSpace);
  } catch (error) {
    console.error(`Error updating space with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not update space' });
  }
};

// Eliminar un espacio
export const deleteSpaceController = async (req: Request, res: Response) => {
  try {
    const spaceId = parseInt(req.params.id);
    const deletedSpace = await deleteSpace(spaceId);

    if (!deletedSpace) {
      return res.status(404).json({ error: 'Space not found' });
    }

    res.json(deletedSpace);
  } catch (error) {
    console.error(`Error deleting space with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not delete space' });
  }
};
