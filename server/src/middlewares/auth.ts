import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import User from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Access denied. No token provided.', 401);
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = verifyToken(token);
      
      // Verify user still exists
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        sendError(res, 'Invalid token. User not found.', 401);
        return;
      }

      req.user = decoded;
      next();
    } catch (tokenError) {
      sendError(res, 'Invalid token.', 401);
      return;
    }
  } catch (error) {
    sendError(res, 'Authentication error', 500);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Access denied. Authentication required.', 401);
      return;
    }

    const hasPermission = roles.length === 0 || 
      (req.user.isAdmin && roles.includes('admin')) ||
      (!req.user.isAdmin && roles.includes('user'));

    if (!hasPermission) {
      sendError(res, 'Access denied. Insufficient permissions.', 403);
      return;
    }

    next();
  };
};