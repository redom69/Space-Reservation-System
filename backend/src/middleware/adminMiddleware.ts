import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface DecodedToken {
  userId: string;
  roleId: number;
  iat: number;
  exp: number;
}

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (user && user.roleId === 1) {
      next(); // User is an admin, proceed to the next middleware/controller
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token or access denied' });
  }
};
