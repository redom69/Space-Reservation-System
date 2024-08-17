"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    try {
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.jwtokensecret);
        if (typeof decodeToken === 'object' &&
            'id' in decodeToken &&
            'roleId' in decodeToken) {
            req.user = {
                id: decodeToken.id,
                roleId: decodeToken.roleId,
            };
        }
        else {
            return res.status(400).json({ error: 'Invalid token structure.' });
        }
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
exports.authenticateToken = authenticateToken;
