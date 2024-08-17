"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const reservationRoutes_1 = __importDefault(require("@routes/reservationRoutes"));
const spaceRoutes_1 = __importDefault(require("@routes/spaceRoutes"));
const roleRoutes_1 = __importDefault(require("@routes/roleRoutes"));
const authRoutes_1 = __importDefault(require("@routes/auth/authRoutes"));
const logger_1 = __importDefault(require("@middleware/logger"));
const adminMiddleware_1 = require("@middleware/adminMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
// Usar las rutas
app.use('/users', userRoutes_1.default);
app.use('/reservations', reservationRoutes_1.default);
app.use('/spaces', spaceRoutes_1.default);
app.use('/roles', roleRoutes_1.default);
app.use('/auth', authRoutes_1.default, adminMiddleware_1.adminOnly);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
