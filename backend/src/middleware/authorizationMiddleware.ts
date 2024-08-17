import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (roles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roleId;

    if (!roles.includes(userRole!)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
};
