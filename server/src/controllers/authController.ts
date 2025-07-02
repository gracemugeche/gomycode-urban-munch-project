import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { IUserResponse, IRegisterRequest, ILoginRequest } from '../types';

// Register new user
export const register = async (req: Request<{}, {}, IRegisterRequest>, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendError(res, 'User already exists with this email', 400);
      return;
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      isAdmin: false
    });

    await user.save();

    // Generate token
    const token = generateToken({
      userId: (user._id as string).toString(),
      email: user.email,
      isAdmin: user.isAdmin
    });

    // Return user data without password
    const userResponse: IUserResponse = {
      _id: (user._id as string).toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    sendSuccess(res, 'User registered successfully', {
      user: userResponse,
      token
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    sendError(res, 'Registration failed', 500);
  }
};

// Login user
export const login = async (req: Request<{}, {}, ILoginRequest>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      sendError(res, 'Invalid email or password', 401);
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      sendError(res, 'Invalid email or password', 401);
      return;
    }

    // Generate token
    const token = generateToken({
      userId: (user._id as string).toString(),
      email: user.email,
      isAdmin: user.isAdmin
    });

    // Return user data without password
    const userResponse: IUserResponse = {
      _id: (user._id as string).toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    sendSuccess(res, 'Login successful', {
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Login failed', 500);
  }
};

// Get current user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    const userResponse: IUserResponse = {
      _id: (user._id as string).toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    sendSuccess(res, 'Profile retrieved successfully', userResponse);
  } catch (error) {
    console.error('Get profile error:', error);
    sendError(res, 'Failed to retrieve profile', 500);
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.user?.userId;

    // Check if email is being changed and already exists
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        sendError(res, 'Email already in use', 400);
        return;
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        ...(name && { name }),
        ...(email && { email })
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    const userResponse: IUserResponse = {
      _id: (user._id as string).toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    };

    sendSuccess(res, 'Profile updated successfully', userResponse);
  } catch (error) {
    console.error('Update profile error:', error);
    sendError(res, 'Failed to update profile', 500);
  }
};