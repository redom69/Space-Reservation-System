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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new Error('User not found');
    const isValidPass = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPass)
        throw new Error('Invalid password');
    const payload = { userId: user.id, role: user.roleId };
    const secretKey = process.env.jwtokensecret;
    const options = { expiresIn: '1h' };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    return token;
});
exports.loginUser = loginUser;
const registerUser = (email, password, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user)
            throw new Error('User already exist');
        return yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                roleId: 2,
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Could not register user');
    }
});
exports.registerUser = registerUser;
