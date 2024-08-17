"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationImplementation = void 0;
class ReservationImplementation {
    constructor(reservation) {
        this.id = reservation.id;
        this.userId = reservation.userId;
        this.spaceId = reservation.spaceId;
        this.startTime = reservation.startTime;
        this.endTime = reservation.endTime;
        this.createdAt = reservation.createdAt;
    }
}
exports.ReservationImplementation = ReservationImplementation;
