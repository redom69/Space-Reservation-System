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
exports.getReservationByUserController = exports.deleteReservationController = exports.updateReservationController = exports.createReservationController = exports.getReservationByIdController = exports.getAllReservationsController = void 0;
const reservationService_1 = require("../services/reservationService");
// Obtener todas las reservas
const getAllReservationsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield (0, reservationService_1.getAllReservations)();
        res.json(reservations);
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Could not fetch reservations' });
    }
});
exports.getAllReservationsController = getAllReservationsController;
// Obtener una reserva por ID
const getReservationByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationId = parseInt(req.params.id);
        const reservation = yield (0, reservationService_1.getReservationById)(reservationId);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(reservation);
    }
    catch (error) {
        console.error(`Error fetching reservation with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not fetch reservation' });
    }
});
exports.getReservationByIdController = getReservationByIdController;
// Crear una nueva reserva
const createReservationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationData = Object.assign({}, req.body);
        const newReservation = yield (0, reservationService_1.createReservation)(reservationData);
        res.status(201).json(newReservation);
    }
    catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Could not create reservation' });
    }
});
exports.createReservationController = createReservationController;
// Actualizar una reserva existente
const updateReservationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationId = parseInt(req.params.id);
        const reservationData = req.body;
        const updatedReservation = yield (0, reservationService_1.updateReservation)(reservationId, reservationData);
        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(updatedReservation);
    }
    catch (error) {
        console.error(`Error updating reservation with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not update reservation' });
    }
});
exports.updateReservationController = updateReservationController;
// Eliminar una reserva
const deleteReservationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationId = parseInt(req.params.id);
        const deletedReservation = yield (0, reservationService_1.deleteReservation)(reservationId);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(deletedReservation);
    }
    catch (error) {
        console.error(`Error deleting reservation with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'Could not delete reservation' });
    }
});
exports.deleteReservationController = deleteReservationController;
const getReservationByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const reservations = yield (0, reservationService_1.getReservationByUser)(userId);
        if (!reservations || reservations.length === 0) {
            return res
                .status(404)
                .json({ error: 'No reservations found for this user' });
        }
        res.json(reservations);
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Could not fetch reservations' });
    }
});
exports.getReservationByUserController = getReservationByUserController;
