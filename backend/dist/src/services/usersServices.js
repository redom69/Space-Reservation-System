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
exports.getUserRole = exports.getUserReservations = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany();
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
                reservations: true,
            },
        });
        return user;
    }
    catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw new Error('Could not retrieve user');
    }
});
exports.getUserById = getUserById;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield prisma.user.create({
            data,
        });
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            console.warn(`User with ID ${id} not found.`);
            return null;
        }
        const updatedUser = yield prisma.user.update({
            where: { id },
            data,
        });
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user');
    }
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return deletedUser;
});
exports.deleteUser = deleteUser;
const getUserReservations = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            console.warn(`User with ID ${id} not found.`);
            return null;
        }
        const user = yield prisma.user.findUnique({
            where: { id },
            include: {
                reservations: true,
            },
        });
        return (user === null || user === void 0 ? void 0 : user.reservations) || null;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
});
exports.getUserReservations = getUserReservations;
const getUserRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            console.warn(`User with ID ${id} not found.`);
            return null;
        }
        const user = yield prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
            },
        });
        return (user === null || user === void 0 ? void 0 : user.role) || null;
    }
    catch (error) {
        console.error('Error fetching user role:', error);
        throw new Error('Could not fetch user role');
    }
});
exports.getUserRole = getUserRole;
