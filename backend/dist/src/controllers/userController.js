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
exports.getUserRoleController = exports.getUserReservationsController = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const usersServices_1 = require("../services/usersServices");
// Obtener todos los usuarios
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersServices_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Could not fetch users' });
    }
});
exports.getAllUsersController = getAllUsersController;
// Obtener un usuario por ID
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield (0, usersServices_1.getUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Could not fetch user' });
    }
});
exports.getUserByIdController = getUserByIdController;
// Crear un nuevo usuario
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body; // Asegúrate de validar la entrada
        const newUser = yield (0, usersServices_1.createUser)(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Could not create user' });
    }
});
exports.createUserController = createUserController;
// Actualizar un usuario existente
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body; // Asegúrate de validar la entrada
        const updatedUser = yield (0, usersServices_1.updateUser)(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Could not update user' });
    }
});
exports.updateUserController = updateUserController;
// Eliminar un usuario
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(`Attempting to delete user with ID: ${userId}`); // Debug log
        const deletedUser = yield (0, usersServices_1.deleteUser)(userId);
        if (!deletedUser) {
            console.log('User not found'); // Debug log
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User successfully deleted'); // Debug log
        res.json(deletedUser);
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Could not delete user' });
    }
});
exports.deleteUserController = deleteUserController;
// Obtener todas las reservas de un usuario
const getUserReservationsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const reservations = yield (0, usersServices_1.getUserReservations)(userId);
        if (!reservations) {
            return res.status(404).json({ error: 'Reservations not found' });
        }
        res.json(reservations);
    }
    catch (error) {
        console.error('Error fetching user reservations:', error);
        res.status(500).json({ error: 'Could not fetch reservations' });
    }
});
exports.getUserReservationsController = getUserReservationsController;
// Obtener el rol de un usuario
const getUserRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const role = yield (0, usersServices_1.getUserRole)(userId);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(role);
    }
    catch (error) {
        console.error('Error fetching user role:', error);
        res.status(500).json({ error: 'Could not fetch role' });
    }
});
exports.getUserRoleController = getUserRoleController;
