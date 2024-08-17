import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decodeToken = jwt.verify(token, process.env.jwtokensecret!);
    if (
      typeof decodeToken === 'object' &&
      'id' in decodeToken &&
      'roleId' in decodeToken
    ) {
      req.user = {
        id: decodeToken.id as string,
        roleId: decodeToken.roleId as number,
      };
    } else {
      return res.status(400).json({ error: 'Invalid token structure.' });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
