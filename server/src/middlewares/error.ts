import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from '../utils/response';

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    sendError(res, 'Validation failed', 400, errorMessages);
    return;
  }
  
  next();
};

// Global error handler
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error stack:', error.stack);

  let message = 'Internal server error';
  let statusCode = 500;

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((val: any) => val.message);
    message = `Validation error: ${errors.join(', ')}`;
    statusCode = 400;
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    statusCode = 400;
  }
  
  // Mongoose cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }
  
  if (error.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  sendError(res, message, statusCode, process.env.NODE_ENV === 'development' ? error.message : undefined);
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};