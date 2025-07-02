# Urban Munch Backend API

A robust Node.js/Express backend for the Urban Munch food and grocery delivery application.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: Full CRUD operations for food/grocery products
- **Order Management**: Complete order lifecycle management
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Express-validator for request validation
- **TypeScript**: Fully typed codebase
- **Error Handling**: Centralized error handling middleware

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   ├── productController.ts # Product management
│   │   └── orderController.ts   # Order management
│   ├── middlewares/
│   │   ├── auth.ts             # Authentication middleware
│   │   ├── error.ts            # Error handling
│   │   └── validation.ts       # Request validation
│   ├── models/
│   │   ├── User.ts             # User schema
│   │   ├── Product.ts          # Product schema
│   │   └── Order.ts            # Order schema
│   ├── routes/
│   │   ├── authRoutes.ts       # Auth endpoints
│   │   ├── productRoutes.ts    # Product endpoints
│   │   └── orderRoutes.ts      # Order endpoints
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── jwt.ts              # JWT utilities
│   │   ├── response.ts         # Response helpers
│   │   └── seedData.ts         # Database seeding
│   └── server.ts               # Main server file
├── .env                        # Environment variables
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript config
```

## 🛠 Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/urban-munch
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure
JWT_EXPIRE=30d
BCRYPT_SALT_ROUNDS=12
```

### 3. Start MongoDB

Make sure MongoDB is running locally or update `MONGO_URI` with your MongoDB Atlas connection string.

### 4. Seed Database (Optional)

```bash
npm run seed
```

This creates:
- Admin user: `admin@urbanmunch.com` / `admin123`
- Sample products across all categories

### 5. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/profile` | Get user profile | Private |
| PUT | `/profile` | Update profile | Private |

### Products (`/api/products`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all products (with filters) | Public |
| GET | `/categories` | Get product categories | Public |
| GET | `/category/:category` | Get products by category | Public |
| GET | `/:id` | Get single product | Public |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new order | Private |
| GET | `/my` | Get user's orders | Private |
| GET | `/stats` | Get order statistics | Admin |
| GET | `/` | Get all orders | Admin |
| GET | `/:id` | Get single order | Private/Admin |
| PUT | `/:id/status` | Update order status | Admin |
| PUT | `/:id/cancel` | Cancel order | Private/Admin |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Request/Response Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product (Admin)

```bash
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Fresh Organic Tomatoes",
  "description": "Juicy red tomatoes grown organically",
  "price": 3.99,
  "category": "vegetables",
  "stock": 50,
  "imageUrl": "https://example.com/tomato.jpg"
}
```

### Create Order

```bash
POST /api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "64f8a1b2c3d4e5f6789012",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "USA"
  }
}
```

## 🧪 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm start          # Start production server
npm run seed       # Seed database with sample data
npm test           # Run tests (when implemented)
```

## 🏗 Database Models

### User Model
- name, email, password (hashed)
- isAdmin boolean flag
- Timestamps

### Product Model
- name, description, price
- category (fruits, vegetables, dairy, etc.)
- stock, imageUrl
- Timestamps

### Order Model
- userId (reference to User)
- items array with productId, quantity, price
- totalAmount, paymentStatus, orderStatus
- shippingAddress object
- Timestamps

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Express-validator for all inputs
- **Password Hashing**: bcrypt with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/urban-munch
JWT_SECRET=your_super_long_and_secure_production_secret
```

### Build for Production

```bash
npm run build
npm start
```

## 📊 Health Check

Check if the API is running:

```bash
GET /health
```

Response:
```json
{
  "success": true,
  "message": "Urban Munch API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

---

**Happy Coding! 🍕🛒**