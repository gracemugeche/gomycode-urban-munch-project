import { useCart } from "../contexts/CartContext";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🧾 Order Summary */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between border-b pb-2">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-purple-700 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 text-right font-bold text-lg">
            Total: <span className="text-purple-800">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* 🚚 Delivery & Payment */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Delivery & Payment</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-md focus:outline-purple-600"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-md focus:outline-purple-600"
            />
            <textarea
              placeholder="Delivery Address (e.g. Estate, House No, Street)"
              className="w-full p-3 border rounded-md h-24 resize-none focus:outline-purple-600"
            />

            {/* 💳 Payment Options */}
            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  <span>Pay with Stripe</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === "mpesa"}
                    onChange={() => setPaymentMethod("mpesa")}
                  />
                  <span>Pay with M-Pesa</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-purple-700 hover:bg-purple-800 text-white
               font-semibold py-3 rounded transition"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
