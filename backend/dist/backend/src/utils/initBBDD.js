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
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Crear roles
        const roles = yield prisma.role.createMany({
            data: [{ name: 'admin' }, { name: 'user' }],
            skipDuplicates: true, // Skip if role already exists
        });
        console.log('Roles creados:', roles);
        // Crear usuarios aleatorios
        for (let i = 0; i < 10; i++) {
            yield prisma.user.create({
                data: {
                    email: faker_1.faker.internet.email(),
                    fullName: faker_1.faker.name.fullName(),
                    password: 'hashedPassword123', // Asegúrate de incluir la propiedad 'password'
                    role: { connect: { id: i % 2 === 0 ? 1 : 2 } }, // Alterna entre admin y user
                },
            });
        }
        console.log('Usuarios aleatorios creados');
        // Crear espacios aleatorios
        for (let i = 0; i < 5; i++) {
            yield prisma.space.create({
                data: {
                    name: `Espacio ${i + 1}`,
                    description: faker_1.faker.lorem.paragraph(),
                    capacity: faker_1.faker.datatype.number({ min: 5, max: 50 }),
                },
            });
        }
        console.log('Espacios aleatorios creados');
        // Crear reservas aleatorias
        const users = yield prisma.user.findMany();
        const spaces = yield prisma.space.findMany();
        for (let i = 0; i < 20; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
            const startTime = faker_1.faker.date.future();
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hora después
            yield prisma.reservation.create({
                data: {
                    user: { connect: { id: randomUser.id } },
                    space: { connect: { id: randomSpace.id } },
                    startTime,
                    endTime,
                },
            });
        }
        console.log('Reservas aleatorias creadas');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
