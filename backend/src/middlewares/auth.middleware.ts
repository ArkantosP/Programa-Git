import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { UserProfile } from '../types/index.js';

export interface AuthRequest extends Request {
  user?: UserProfile;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ ok: false, error: 'Authorization header missing or invalid' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as UserProfile;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ ok: false, error: 'Token expired or invalid' });
    return;
  }
};
