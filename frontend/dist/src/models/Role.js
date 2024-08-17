"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleImplementation = void 0;
class RoleImplementation {
    constructor(role) {
        this.id = role.id;
        this.name = role.name;
        this.users = role.users || [];
    }
}
exports.RoleImplementation = RoleImplementation;
