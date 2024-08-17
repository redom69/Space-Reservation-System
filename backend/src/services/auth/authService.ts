import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error('User not found');

  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) throw new Error('Invalid password');

  const payload = { userId: user.id, role: user.roleId };
  const secretKey = process.env.jwtokensecret!;
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secretKey, options);

  return token;
};

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) throw new Error('User already exist');
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        roleId: 2,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Could not register user');
  }
};
