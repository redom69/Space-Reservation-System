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
exports.getReservationByUser = exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationById = exports.getAllReservations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllReservations = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.reservation.findMany();
});
exports.getAllReservations = getAllReservations;
const getReservationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield prisma.reservation.findUnique({
            where: { id },
            include: {
                user: true,
                space: true,
            },
        });
        return reservation;
    }
    catch (error) {
        console.error(`Error fetching reservation with id ${id}:`, error);
        throw new Error('Could not retrieve the reservation');
    }
});
exports.getReservationById = getReservationById;
const createReservation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReservation = yield prisma.reservation.create({ data });
        return newReservation;
    }
    catch (error) {
        console.error('Error creating reservation:', error);
        throw new Error('Could not create reservation');
    }
});
exports.createReservation = createReservation;
const updateReservation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingReservation = yield prisma.reservation.findUnique({
            where: { id },
        });
        if (!existingReservation) {
            console.warn(`Reservation with ID ${id} not found.`);
            return null;
        }
        const updatedReservation = yield prisma.reservation.update({
            where: { id },
            data,
        });
        return updatedReservation;
    }
    catch (error) {
        console.error(`Error updating reservation with id ${id}:`, error);
        throw new Error('Could not update reservation');
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingReservation = yield prisma.reservation.findUnique({
            where: { id },
        });
        if (!existingReservation) {
            console.warn(`Reservation with ID ${id} not found.`);
            return null;
        }
        const deletedReservation = yield prisma.reservation.delete({
            where: { id },
        });
        return deletedReservation;
    }
    catch (error) {
        console.error(`Error deleting reservation with id ${id}:`, error);
        throw new Error('Could not delete reservation');
    }
});
exports.deleteReservation = deleteReservation;
const getReservationByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield prisma.reservation.findMany({
            where: {
                userId: userId,
            },
            include: {
                space: true,
            },
        });
        return reservations;
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
        throw new Error('Could not fetch reservations');
    }
});
exports.getReservationByUser = getReservationByUser;
