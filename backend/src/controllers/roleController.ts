import { Request, Response } from 'express';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getUsersByRole,
  CreateRole,
} from '../services/roleService';

// Obtener todos los roles
export const getAllRolesController = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Could not fetch roles' });
  }
};

// Obtener un rol por ID
export const getRoleByIdController = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = await getRoleById(roleId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    console.error(`Error fetching role with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not fetch role' });
  }
};

// Crear un nuevo rol
export const createRoleController = async (req: Request, res: Response) => {
  try {
    const roleData: CreateRole = req.body;
    const newRole = await createRole(roleData);

    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Could not create role' });
  }
};

// Actualizar un rol existente
export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id);
    const roleData: Partial<CreateRole> = req.body;
    const updatedRole = await updateRole(roleId, roleData);

    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(updatedRole);
  } catch (error) {
    console.error(`Error updating role with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not update role' });
  }
};

// Eliminar un rol
export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id);
    const deletedRole = await deleteRole(roleId);

    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json(deletedRole);
  } catch (error) {
    console.error(`Error deleting role with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Could not delete role' });
  }
};

// Obtener todos los usuarios asociados a un rol
export const getUsersByRoleController = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = await getRoleById(roleId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const users = await getUsersByRole(role);

    res.json(users);
  } catch (error) {
    console.error(
      `Error fetching users for role with id ${req.params.id}:`,
      error
    );
    res.status(500).json({ error: 'Could not fetch users for role' });
  }
};
