import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories
} from '../controllers/productController';
import { authenticate, authorize } from '../middlewares/auth';
import { handleValidationErrors } from '../middlewares/error';
import {
  validateProduct,
  validateUpdateProduct,
  validateObjectId,
  validateProductQuery
} from '../middlewares/validation';

const router = Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', validateProductQuery, handleValidationErrors, getProducts);

// @route   GET /api/products/categories
// @desc    Get product categories with counts
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', validateObjectId, handleValidationErrors, getProductById);

// @route   POST /api/products
// @desc    Create new product (admin only)
// @access  Private/Admin
router.post('/', authenticate, authorize('admin'), validateProduct, handleValidationErrors, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product (admin only)
// @access  Private/Admin
router.put('/:id', authenticate, authorize('admin'), validateObjectId, validateUpdateProduct, handleValidationErrors, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product (admin only)
// @access  Private/Admin
router.delete('/:id', authenticate, authorize('admin'), validateObjectId, handleValidationErrors, deleteProduct);

export default router;