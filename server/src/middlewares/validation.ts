import { body, param, query, ValidationChain } from 'express-validator';

// User validation rules
export const validateRegister: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number')
];

export const validateLogin: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateUpdateProfile: ValidationChain[] = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// Product validation rules
export const validateProduct: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks', 'frozen', 'pantry', 'ready-meals'])
    .withMessage('Please select a valid category'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('imageUrl')
    .isURL()
    .withMessage('Please provide a valid image URL')
];

export const validateUpdateProduct: ValidationChain[] = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .isIn(['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks', 'frozen', 'pantry', 'ready-meals'])
    .withMessage('Please select a valid category'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid image URL')
];

// Order validation rules
export const validateOrder: ValidationChain[] = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.zipCode')
    .trim()
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage('Please provide a valid zip code'),
  body('shippingAddress.country')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Country cannot be empty')
];

export const validateOrderStatus: ValidationChain[] = [
  body('orderStatus')
    .isIn(['processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Please select a valid order status'),
  body('paymentStatus')
    .optional()
    .isIn(['pending', 'paid', 'failed'])
    .withMessage('Please select a valid payment status')
];

// Common parameter validations
export const validateObjectId: ValidationChain[] = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];

// Query parameter validations
export const validateProductQuery: ValidationChain[] = [
  query('category')
    .optional()
    .isIn(['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks', 'frozen', 'pantry', 'ready-meals'])
    .withMessage('Invalid category'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search term cannot be empty'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];