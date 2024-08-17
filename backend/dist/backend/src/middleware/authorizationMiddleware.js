"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roleId;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
