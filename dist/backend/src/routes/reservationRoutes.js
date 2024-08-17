"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const router = (0, express_1.Router)();
// Obtener todas las reservas
router.get('/', reservationController_1.getAllReservationsController);
// Obtener una reserva por ID
router.get('/reservation/:id', reservationController_1.getReservationByIdController);
router.get('/user/:id', reservationController_1.getReservationByUserController);
// Crear una nueva reserva
router.post('/reservation', reservationController_1.createReservationController);
// Actualizar una reserva existente
router.put('/reservation/:id', reservationController_1.updateReservationController);
// Eliminar una reserva
router.delete('/reservation/:id', reservationController_1.deleteReservationController);
exports.default = router;
