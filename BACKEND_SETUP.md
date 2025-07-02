# 🚀 Urban Munch Backend - Complete Setup Guide

## 📋 Overview

I've successfully created a complete, production-ready backend for the Urban Munch food and grocery delivery application. The backend includes all the features specified in your README with proper TypeScript implementation, security measures, and comprehensive API endpoints.

## 🎯 What Was Built

### ✅ Core Features Implemented

1. **Authentication System**
   - User registration and login
   - JWT-based authentication
   - Password hashing with bcrypt
   - Role-based access control (User/Admin)

2. **Product Management**
   - Full CRUD operations for products
   - Category-based filtering
   - Search functionality with pagination
   - Stock management

3. **Order Management**
   - Order creation with inventory validation
   - Order tracking and status updates
   - User order history
   - Admin order management with statistics

4. **Security & Validation**
   - Helmet for security headers
   - CORS configuration
   - Rate limiting (100 requests per 15 minutes)
   - Input validation with express-validator
   - Centralized error handling

## 📁 Backend Structure Created

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # User auth (register, login, profile)
│   │   ├── productController.ts # Product CRUD & search
│   │   └── orderController.ts   # Order management
│   ├── middlewares/
│   │   ├── auth.ts             # JWT authentication & authorization
│   │   ├── error.ts            # Error handling & validation
│   │   └── validation.ts       # Request validation rules
│   ├── models/
│   │   ├── User.ts             # User schema with password hashing
│   │   ├── Product.ts          # Product schema with categories
│   │   └── Order.ts            # Order schema with relationships
│   ├── routes/
│   │   ├── authRoutes.ts       # Authentication endpoints
│   │   ├── productRoutes.ts    # Product management endpoints
│   │   └── orderRoutes.ts      # Order management endpoints
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── jwt.ts              # JWT token utilities
│   │   ├── response.ts         # Standardized API responses
│   │   └── seedData.ts         # Database seeding with sample data
│   └── server.ts               # Main Express server setup
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── nodemon.json               # Development server config
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Comprehensive documentation
```

## 🚀 Quick Start

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Dependencies Already Installed ✅
All required dependencies have been installed:
- Express.js with TypeScript
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Security middleware (helmet, cors, rate-limiting)
- Validation with express-validator

### 3. Configure Environment Variables
The `.env` file is already created with development defaults:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/urban-munch
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure_for_production
JWT_EXPIRE=30d
BCRYPT_SALT_ROUNDS=12
```

### 4. Start MongoDB
Make sure MongoDB is running locally, or update `MONGO_URI` with your MongoDB Atlas connection string.

### 5. Seed the Database (Optional)
```bash
npm run seed
```
This creates:
- **Admin User**: `admin@urbanmunch.com` / `admin123`
- **Sample Products**: 12 products across all categories (fruits, vegetables, dairy, meat, bakery, beverages)

### 6. Start the Development Server
```bash
npm run dev
```

The server will start at: **http://localhost:5000**

## 📚 API Endpoints Available

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### 📦 Products (`/api/products`)
- `GET /api/products` - Get all products (with search, filter, pagination)
- `GET /api/products/categories` - Get product categories
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### 📋 Orders (`/api/orders`)
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/my` - Get user's orders (Protected)
- `GET /api/orders/stats` - Get order statistics (Admin)
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order (Protected/Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected/Admin)

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Create Order (with token)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "items": [{"productId": "PRODUCT_ID", "quantity": 2}],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "country": "USA"
    }
  }'
```

## 🔧 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run seed       # Seed database with sample data
```

## 🌟 Key Features & Security

### Authentication & Authorization
- JWT tokens with configurable expiration
- Password hashing with bcrypt (12 salt rounds)
- Role-based access control (User/Admin)
- Protected routes with middleware

### Data Validation
- Comprehensive input validation on all endpoints
- MongoDB schema validation
- TypeScript type safety throughout

### Security Measures
- Helmet for security headers
- CORS with configurable origins
- Rate limiting to prevent abuse
- Environment variable configuration
- Error handling that doesn't leak sensitive info

### Database Features
- MongoDB with Mongoose ODM
- Proper relationships between models
- Indexing for better performance
- Automatic timestamps
- Data seeding functionality

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/urban-munch
JWT_SECRET=your_super_long_and_secure_production_secret
PORT=5000
```

### Build and Start
```bash
npm run build
npm start
```

## 🎉 Ready for Frontend Integration

The backend is now fully ready and can be integrated with your React frontend. All API endpoints follow RESTful conventions and return standardized JSON responses with proper HTTP status codes.

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 📞 Next Steps

1. **Start the server**: `npm run dev`
2. **Test the endpoints** using the examples above
3. **Seed the database**: `npm run seed` for sample data
4. **Connect your React frontend** to `http://localhost:5000/api`
5. **Update CORS origins** in `server.ts` for your frontend URL

The backend is production-ready with proper error handling, security measures, and comprehensive functionality for a food delivery application! 🚀🍕