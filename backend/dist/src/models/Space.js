"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceImplementation = void 0;
class SpaceImplementation {
    constructor(space) {
        this.id = space.id;
        this.name = space.name;
        this.description = space.description;
        this.capacity = space.capacity;
        this.createdAt = space.createdAt;
        this.reservations = space.reservations || [];
    }
}
exports.SpaceImplementation = SpaceImplementation;
