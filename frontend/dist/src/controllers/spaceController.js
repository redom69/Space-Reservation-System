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
exports.deleteSpaceController = exports.updateSpaceController = exports.createSpaceController = exports.getSpaceByIdController = exports.getAllSpacesController = void 0;
const spaceService_1 = require("../services/spaceService");
// Obtener todos los espacios
const getAllSpacesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaces = yield (0, spaceService_1.getAllSpaces)();
        res.json(spaces);
    }
    catch (error) {
        console.error('Error fetching spaces:', error);
        res.status(500).json({ error: 'Could not fetch spaces' });
    }
});
exports.getAllSpacesController = getAllSpacesController;
// Obtener un espacio por ID
const getSpaceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceId = parseInt(req.params.id);
        const space = yield (0, spaceService_1.getSpaceById)(spaceId);
        if (!space) {
            return res.status(404).json({ error: 'Space not found' });
        }
        res.json(space);
    }
    catch (error) {
        console.error(`Error fetching space with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not fetch space' });
    }
});
exports.getSpaceByIdController = getSpaceByIdController;
// Crear un nuevo espacio
const createSpaceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceData = req.body;
        const newSpace = yield (0, spaceService_1.createSpace)(spaceData);
        res.status(201).json(newSpace);
    }
    catch (error) {
        console.error('Error creating space:', error);
        res.status(500).json({ error: 'Could not create space' });
    }
});
exports.createSpaceController = createSpaceController;
// Actualizar un espacio existente
const updateSpaceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceId = parseInt(req.params.id);
        const spaceData = req.body;
        const updatedSpace = yield (0, spaceService_1.updateSpace)(spaceId, spaceData);
        if (!updatedSpace) {
            return res.status(404).json({ error: 'Space not found' });
        }
        res.json(updatedSpace);
    }
    catch (error) {
        console.error(`Error updating space with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not update space' });
    }
});
exports.updateSpaceController = updateSpaceController;
// Eliminar un espacio
const deleteSpaceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceId = parseInt(req.params.id);
        const deletedSpace = yield (0, spaceService_1.deleteSpace)(spaceId);
        if (!deletedSpace) {
            return res.status(404).json({ error: 'Space not found' });
        }
        res.json(deletedSpace);
    }
    catch (error) {
        console.error(`Error deleting space with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not delete space' });
    }
});
exports.deleteSpaceController = deleteSpaceController;
