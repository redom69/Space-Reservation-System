"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spaceController_1 = require("../controllers/spaceController");
const router = (0, express_1.Router)();
// Obtener todos los espacios
router.get('/', spaceController_1.getAllSpacesController);
// Obtener un espacio por ID
router.get('/space/:id', spaceController_1.getSpaceByIdController);
// Crear un nuevo espacio
router.post('/space', spaceController_1.createSpaceController);
// Actualizar un espacio existente
router.put('/space/:id', spaceController_1.updateSpaceController);
// Eliminar un espacio
router.delete('/space/:id', spaceController_1.deleteSpaceController);
exports.default = router;
