import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      roleId: number;
      // Agrega otras propiedades que estés usando
    };
  }
}
