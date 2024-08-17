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
exports.getUsersByRole = exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.role.findMany();
});
exports.getAllRoles = getAllRoles;
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield prisma.role.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });
        return role;
    }
    catch (error) {
        console.error(`Error fetching role with id ${id}:`, error);
        throw new Error('Could not retrieve the role');
    }
});
exports.getRoleById = getRoleById;
const createRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield prisma.role.create({ data });
        return newRole;
    }
    catch (error) {
        console.error(`Error creating a role ${data.toString()}`, error);
        throw new Error('Could not create role');
    }
});
exports.createRole = createRole;
const updateRole = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRole = yield prisma.role.findUnique({ where: { id } });
        if (!existingRole) {
            console.warn(`Role with ID ${id} not found.`);
            return null;
        }
        const updateRole = yield prisma.role.update({ where: { id }, data });
        return updateRole;
    }
    catch (error) {
        console.error(`Error updating role with ${id.toString()}`, error);
        throw new Error('Could not update role');
    }
});
exports.updateRole = updateRole;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRole = yield prisma.role.findUnique({
            where: { id },
        });
        if (!existingRole) {
            console.warn(`Role with ID ${id} not found.`);
            return null;
        }
        const deletedRole = yield prisma.role.delete({ where: { id } });
        return deletedRole;
    }
    catch (error) {
        console.error(`Error deleting role with id ${id}:`, error);
        throw new Error('Could not delete role');
    }
});
exports.deleteRole = deleteRole;
const getUsersByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRole = yield prisma.role.findFirst({
            where: { id: role.id },
            include: {
                users: true,
            },
        });
        if (!existingRole) {
            console.warn(`Role not found.`);
            return null;
        }
        return existingRole.users;
    }
    catch (error) {
        console.error(`Error obatining users:`, error);
        throw new Error('Could not get users');
    }
});
exports.getUsersByRole = getUsersByRole;
