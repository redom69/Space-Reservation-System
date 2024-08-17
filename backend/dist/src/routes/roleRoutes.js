"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const router = (0, express_1.Router)();
// Obtener todos los roles
router.get('/', roleController_1.getAllRolesController);
// Obtener un rol por ID
router.get('/role/:id', roleController_1.getRoleByIdController);
// Crear un nuevo rol
router.post('/role', roleController_1.createRoleController);
// Actualizar un rol existente
router.put('/role/:id', roleController_1.updateRoleController);
// Eliminar un rol
router.delete('/role/:id', roleController_1.deleteRoleController);
// Obtener todos los usuarios asociados a un rol
router.get('/role/:id/users', roleController_1.getUsersByRoleController);
exports.default = router;
