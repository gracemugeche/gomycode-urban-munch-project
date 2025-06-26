import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="font-semibold text-slate-800">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-purple-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <Link
                to="/"
                className="text-purple-700 hover:text-purple-900 text-sm font-medium"
              >
                ← Continue Shopping
              </Link>

              <div className="text-right">
                <p className="text-lg font-semibold text-slate-800">
                  Total:{" "}
                  <span className="text-purple-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
                <Link to="/checkout">
                  <button className="mt-2 bg-purple-700 hover:bg-purple-800 text-white
                   px-5 py-2 rounded-lg transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
