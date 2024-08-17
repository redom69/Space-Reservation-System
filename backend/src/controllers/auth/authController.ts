import { Request, Response } from 'express';
import { registerUser, loginUser } from '@services/auth/authService';

export const registerController = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  try {
    const user = await registerUser(email, password, fullName);
    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    const err = error as Error;
    res.status(401).json({ error: err.message });
  }
};
