# 🛒 Urban Munch – Full-Stack Food & Grocery eCommerce App

Urban Munch is a modern and responsive food/grocery delivery web application built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **TypeScript** and **Tailwind CSS**. It allows users to browse food and grocery items, add to cart, place orders, and manage their profile. Admins can manage products and orders through a dedicated dashboard.

---

## 📌 Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Installation](#installation)
- [Project Timeline](#project-timeline)
- [Deployment](#deployment)
- [Credits](#credits)

---

## 🔗 Live Demo

> Coming soon…

---

## ✨ Features

### 👥 Users
- Register and log in
- Browse products by category or keyword
- View product details
- Add/remove items to/from cart
- Checkout and place orders
- Track past orders and order status
- Manage profile information

### 🛠️ Admins
- Admin login
- Add/edit/delete products
- View/manage orders
- Manage users
- Admin dashboard with basic analytics

---

## 🛠 Tech Stack

### Frontend
- **React** with **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **React Hook Form / Formik**
- **React Context API** or **Redux**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **JWT** Authentication
- **bcrypt** for password hashing
- **Multer** for image upload

---

## 📁 Folder Structure

```

urban-munch/
│
├── client/                # React + Tailwind Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── tailwind.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── server/                # Node + Express + MongoDB Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── config/
│   │   ├── types/
│   │   ├── uploads/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json

````

---

## 🔗 API Endpoints

### 👤 User Routes
- `POST /api/users/register` – Register new user
- `POST /api/users/login` – Login
- `GET /api/users/profile` – Get current user profile
- `PUT /api/users/profile` – Update profile

### 📦 Product Routes
- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get single product
- `POST /api/products` – Create product (admin)
- `PUT /api/products/:id` – Update product (admin)
- `DELETE /api/products/:id` – Delete product (admin)

### 📬 Order Routes
- `POST /api/orders` – Create order
- `GET /api/orders/my` – Get logged-in user's orders
- `GET /api/orders` – Get all orders (admin)
- `PUT /api/orders/:id/status` – Update order status (admin)

---

## 📦 Database Models

### User
```ts
{
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}
````

### Product

```ts
{
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: Date;
}
```

### Order

```ts
{
  userId: ObjectId;
  items: [
    {
      productId: ObjectId;
      quantity: number;
    }
  ];
  totalAmount: number;
  paymentStatus: "pending" | "paid";
  orderStatus: "processing" | "shipped" | "delivered";
  createdAt: Date;
}
```

---

## 🚀 Installation

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* npm or yarn

### 1. Clone the Repo

```bash
git clone https://github.com/gracemugeche/gomycode-urban-munch-project.git
cd gomycode-urban-munch-project
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Set Up Backend `.env`

Create a `.env` file in `server/` with:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 6. Run the Frontend

```bash
npm run dev
```

Frontend will be running at `http://localhost:5173`
Backend will run at `http://localhost:5000`

---

## 📅 Project Timeline (11-Day Plan)

| **Day** | **Goal**                                            |
| ------- | --------------------------------------------------- |
| Day 1   | Project setup, GitHub repo, folders, dependencies   |
| Day 2   | Backend setup: Express, MongoDB connection, testing |
| Day 3   | Auth system (register/login), JWT, bcrypt           |
| Day 4   | Product model and CRUD API                          |
| Day 5   | Order model, cart handling, checkout                |
| Day 6   | Frontend setup with Tailwind, routing               |
| Day 7   | Auth pages (login/register), token storage          |
| Day 8   | Product list/detail pages, cart functionality       |
| Day 9   | Admin dashboard (orders, products)                  |
| Day 10  | UI polish, validation, responsive checks            |
| Day 11  | Deployment, README, final testing, wrap-up 🎉       |

---

## 🌐 Deployment

* **Frontend**: [Vercel](https://vercel.com/) / Netlify
* **Backend**: [Render](https://render.com/) / Railway / Heroku
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

### Frontend `.env.local` Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 👤 Author

**Grace Wambui Mugeche**
📧 [gracemugeche@gmail.com](mailto:gracemugeche@gmail.com)
🔗 [GitHub – gracemugeche](https://github.com/gracemugeche)

---

## 📜 License

This project is for educational and demonstration purposes only.

---

```

