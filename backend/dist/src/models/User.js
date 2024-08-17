"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImplementation = void 0;
class UserImplementation {
    constructor(id, email, fullName, roleId, password) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.roleId = roleId;
        this.password = password;
        this.createdAt = new Date(); // Corrige la inicialización de createdAt
    }
    getFullName() {
        throw new Error('Method not implemented.');
    }
}
exports.UserImplementation = UserImplementation;
