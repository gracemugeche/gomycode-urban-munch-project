import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} from '../controllers/orderController';
import { authenticate, authorize } from '../middlewares/auth';
import { handleValidationErrors } from '../middlewares/error';
import {
  validateOrder,
  validateOrderStatus,
  validateObjectId
} from '../middlewares/validation';

const router = Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authenticate, validateOrder, handleValidationErrors, createOrder);

// @route   GET /api/orders/my
// @desc    Get current user's orders
// @access  Private
router.get('/my', authenticate, getMyOrders);

// @route   GET /api/orders/stats
// @desc    Get order statistics (admin only)
// @access  Private/Admin
router.get('/stats', authenticate, authorize('admin'), getOrderStats);

// @route   GET /api/orders
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get('/', authenticate, authorize('admin'), getAllOrders);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private (own orders) / Admin (all orders)
router.get('/:id', authenticate, validateObjectId, handleValidationErrors, getOrderById);

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put('/:id/status', authenticate, authorize('admin'), validateObjectId, validateOrderStatus, handleValidationErrors, updateOrderStatus);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private (own orders) / Admin (all orders)
router.put('/:id/cancel', authenticate, validateObjectId, handleValidationErrors, cancelOrder);

export default router;