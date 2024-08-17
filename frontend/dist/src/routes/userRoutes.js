"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Obtener todos los usuarios
router.get('/', userController_1.getAllUsersController);
// Obtener un usuario por ID
router.get('/user/:id', userController_1.getUserByIdController);
// Crear un nuevo usuario
router.post('/user', userController_1.createUserController);
// Actualizar un usuario existente
router.put('/user/:id', userController_1.updateUserController);
// Eliminar un usuario
router.delete('/user/:id', userController_1.deleteUserController);
// Obtener todas las reservas de un usuario
router.get('/user/:id/reservations', userController_1.getUserReservationsController);
// Obtener el rol de un usuario
router.get('/user/:id/role', userController_1.getUserRoleController);
exports.default = router;
