import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { sendSuccess, sendError } from '../utils/response';
import { IOrderInput } from '../types';

// Create new order
export const createOrder = async (req: Request<{}, {}, IOrderInput>, res: Response): Promise<void> => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user?.userId;

    // Validate and calculate order total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        sendError(res, `Product with ID ${item.productId} not found`, 404);
        return;
      }

      if (product.stock < item.quantity) {
        sendError(res, `Insufficient stock for ${product.name}. Available: ${product.stock}`, 400);
        return;
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending',
      orderStatus: 'processing'
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    sendSuccess(res, 'Order created successfully', order, 201);
  } catch (error) {
    console.error('Create order error:', error);
    sendError(res, 'Failed to create order', 500);
  }
};

// Get user's orders
export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [orders, totalOrders] = await Promise.all([
      Order.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments({ userId })
    ]);

    const totalPages = Math.ceil(totalOrders / limitNum);

    sendSuccess(res, 'Orders retrieved successfully', {
      orders,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalOrders,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    sendError(res, 'Failed to retrieve orders', 500);
  }
};

// Get single order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const isAdmin = req.user?.isAdmin;

    const query = isAdmin ? { _id: id } : { _id: id, userId };
    const order = await Order.findOne(query);

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    sendSuccess(res, 'Order retrieved successfully', order);
  } catch (error) {
    console.error('Get order error:', error);
    sendError(res, 'Failed to retrieve order', 500);
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      orderStatus, 
      paymentStatus,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter: any = {};
    if (orderStatus) filter.orderStatus = orderStatus;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const [orders, totalOrders] = await Promise.all([
      Order.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalOrders / limitNum);

    sendSuccess(res, 'All orders retrieved successfully', {
      orders,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalOrders,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    sendError(res, 'Failed to retrieve orders', 500);
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updateData: any = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    sendSuccess(res, 'Order status updated successfully', order);
  } catch (error) {
    console.error('Update order status error:', error);
    sendError(res, 'Failed to update order status', 500);
  }
};

// Cancel order
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const isAdmin = req.user?.isAdmin;

    const query = isAdmin ? { _id: id } : { _id: id, userId };
    const order = await Order.findOne(query);

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    if (order.orderStatus === 'delivered') {
      sendError(res, 'Cannot cancel a delivered order', 400);
      return;
    }

    if (order.orderStatus === 'cancelled') {
      sendError(res, 'Order is already cancelled', 400);
      return;
    }

    // Update order status
    order.orderStatus = 'cancelled';
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } }
      );
    }

    sendSuccess(res, 'Order cancelled successfully', order);
  } catch (error) {
    console.error('Cancel order error:', error);
    sendError(res, 'Failed to cancel order', 500);
  }
};

// Get order statistics (admin only)
export const getOrderStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    const statusStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const paymentStats = await Order.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    sendSuccess(res, 'Order statistics retrieved successfully', {
      overview: stats[0] || { totalOrders: 0, totalRevenue: 0, avgOrderValue: 0 },
      orderStatus: statusStats,
      paymentStatus: paymentStats
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    sendError(res, 'Failed to retrieve order statistics', 500);
  }
};