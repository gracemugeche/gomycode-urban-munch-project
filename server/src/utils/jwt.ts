import jwt, { SignOptions } from 'jsonwebtoken';
import { IAuthPayload } from '../types';

const generateToken = (payload: IAuthPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || '30d';

  if (!secret) {
    throw new Error('JWT_SECRET not found in environment variables');
  }

  return jwt.sign(payload, secret, { expiresIn } as any);
};

const verifyToken = (token: string): IAuthPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET not found in environment variables');
  }

  return jwt.verify(token, secret) as IAuthPayload;
};

export { generateToken, verifyToken };