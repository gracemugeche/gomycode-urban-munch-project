import { Request, Response } from 'express';
import Product from '../models/Product';
import { sendSuccess, sendError } from '../utils/response';
import { IProductInput } from '../types';

// Get all products with filtering and pagination
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Calculate pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalProducts / limitNum);

    sendSuccess(res, 'Products retrieved successfully', {
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    sendError(res, 'Failed to retrieve products', 500);
  }
};

// Get single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      sendError(res, 'Product not found', 404);
      return;
    }

    sendSuccess(res, 'Product retrieved successfully', product);
  } catch (error) {
    console.error('Get product error:', error);
    sendError(res, 'Failed to retrieve product', 500);
  }
};

// Create new product (admin only)
export const createProduct = async (req: Request<{}, {}, IProductInput>, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    const product = new Product(productData);
    await product.save();

    sendSuccess(res, 'Product created successfully', product, 201);
  } catch (error) {
    console.error('Create product error:', error);
    sendError(res, 'Failed to create product', 500);
  }
};

// Update product (admin only)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      sendError(res, 'Product not found', 404);
      return;
    }

    sendSuccess(res, 'Product updated successfully', product);
  } catch (error) {
    console.error('Update product error:', error);
    sendError(res, 'Failed to update product', 500);
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      sendError(res, 'Product not found', 404);
      return;
    }

    sendSuccess(res, 'Product deleted successfully');
  } catch (error) {
    console.error('Delete product error:', error);
    sendError(res, 'Failed to delete product', 500);
  }
};

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [products, totalProducts] = await Promise.all([
      Product.find({ category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Product.countDocuments({ category })
    ]);

    const totalPages = Math.ceil(totalProducts / limitNum);

    sendSuccess(res, `Products in ${category} category retrieved successfully`, {
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    sendError(res, 'Failed to retrieve products by category', 500);
  }
};

// Get product categories with counts
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    console.error('Get categories error:', error);
    sendError(res, 'Failed to retrieve categories', 500);
  }
};