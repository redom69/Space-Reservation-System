"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRoleController = exports.deleteRoleController = exports.updateRoleController = exports.createRoleController = exports.getRoleByIdController = exports.getAllRolesController = void 0;
const roleService_1 = require("../services/roleService");
// Obtener todos los roles
const getAllRolesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, roleService_1.getAllRoles)();
        res.json(roles);
    }
    catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Could not fetch roles' });
    }
});
exports.getAllRolesController = getAllRolesController;
// Obtener un rol por ID
const getRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.id);
        const role = yield (0, roleService_1.getRoleById)(roleId);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(role);
    }
    catch (error) {
        console.error(`Error fetching role with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not fetch role' });
    }
});
exports.getRoleByIdController = getRoleByIdController;
// Crear un nuevo rol
const createRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleData = req.body;
        const newRole = yield (0, roleService_1.createRole)(roleData);
        res.status(201).json(newRole);
    }
    catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Could not create role' });
    }
});
exports.createRoleController = createRoleController;
// Actualizar un rol existente
const updateRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.id);
        const roleData = req.body;
        const updatedRole = yield (0, roleService_1.updateRole)(roleId, roleData);
        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(updatedRole);
    }
    catch (error) {
        console.error(`Error updating role with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not update role' });
    }
});
exports.updateRoleController = updateRoleController;
// Eliminar un rol
const deleteRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.id);
        const deletedRole = yield (0, roleService_1.deleteRole)(roleId);
        if (!deletedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(deletedRole);
    }
    catch (error) {
        console.error(`Error deleting role with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not delete role' });
    }
});
exports.deleteRoleController = deleteRoleController;
// Obtener todos los usuarios asociados a un rol
const getUsersByRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = parseInt(req.params.id);
        const role = yield (0, roleService_1.getRoleById)(roleId);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        const users = yield (0, roleService_1.getUsersByRole)(role);
        res.json(users);
    }
    catch (error) {
        console.error(`Error fetching users for role with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not fetch users for role' });
    }
});
exports.getUsersByRoleController = getUsersByRoleController;
