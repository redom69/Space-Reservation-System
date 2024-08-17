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
exports.deleteSpace = exports.updateSpace = exports.createSpace = exports.getSpaceById = exports.getAllSpaces = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllSpaces = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.space.findMany();
});
exports.getAllSpaces = getAllSpaces;
const getSpaceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const space = yield prisma.space.findUnique({
            where: { id },
            include: {
                reservations: true,
            },
        });
        return space;
    }
    catch (error) {
        console.error(`Error fetching space with id ${id}:`, error);
        throw new Error('Could not retrieve the space');
    }
});
exports.getSpaceById = getSpaceById;
const createSpace = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSpace = yield prisma.space.create({ data });
        return newSpace;
    }
    catch (error) {
        console.error('Error creating space:', error);
        throw new Error('Could not create space');
    }
});
exports.createSpace = createSpace;
const updateSpace = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSpace = yield prisma.space.findUnique({
            where: { id },
        });
        if (!existingSpace) {
            console.warn(`Space with ID ${id} not found.`);
            return null;
        }
        const updatedSpace = yield prisma.space.update({
            where: { id },
            data,
        });
        return updatedSpace;
    }
    catch (error) {
        console.error(`Error updating space with id ${id}:`, error);
        throw new Error('Could not update space');
    }
});
exports.updateSpace = updateSpace;
const deleteSpace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSpace = yield prisma.space.findUnique({
            where: { id },
        });
        if (!existingSpace) {
            console.warn(`Space with ID ${id} not found.`);
            return null;
        }
        const deletedSpace = yield prisma.space.delete({ where: { id } });
        return deletedSpace;
    }
    catch (error) {
        console.error(`Error deleting space with id ${id}:`, error);
        throw new Error('Could not delete space');
    }
});
exports.deleteSpace = deleteSpace;
