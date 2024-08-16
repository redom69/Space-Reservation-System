import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const roles = await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
    ],
    skipDuplicates: true, // Skip if role already exists
  });

  console.log('Roles creados:', roles);

  // Crear usuarios aleatorios
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        fullName: faker.name.fullName(),
        role: { connect: { id: i % 2 === 0 ? 1 : 2 } }, // Alterna entre admin y user
      },
    });
  }

  console.log('Usuarios aleatorios creados');

  // Crear espacios aleatorios
  for (let i = 0; i < 5; i++) {
    await prisma.space.create({
      data: {
        name: `Espacio ${i + 1}`,
        description: faker.lorem.paragraph(),
        capacity: faker.datatype.number({ min: 5, max: 50 }),
      },
    });
  }

  console.log('Espacios aleatorios creados');

  // Crear reservas aleatorias
  const users = await prisma.user.findMany();
  const spaces = await prisma.space.findMany();

  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
    const startTime = faker.date.future();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hora después

    await prisma.reservation.create({
      data: {
        user: { connect: { id: randomUser.id } },
        space: { connect: { id: randomSpace.id } },
        startTime,
        endTime,
      },
    });
  }

  console.log('Reservas aleatorias creadas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
