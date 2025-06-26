import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Meal from "../pages/Meals";
import Groceries from "../pages/Groceries";
import Drink from "../pages/Drinks";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/meals" element={<Meal />} />
      <Route path="/groceries" element={<Groceries/>} />
      <Route path="/drinks" element={<Drink/>} />
    </Routes>
  );
};

export default AppRoutes;
