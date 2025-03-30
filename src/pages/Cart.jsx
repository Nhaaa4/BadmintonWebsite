/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // Adjusted import path

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getSubtotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return getSubtotal() + calculateTax();
  };

  // Prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#1e2535] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <motion.div
            className="bg-[#2c3b5a] rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/product">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#2c3b5a] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Cart Items ({cartItems.length})</h2>
                </div>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="p-4 flex items-center border-b border-gray-700 last:border-b-0"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-contain w-full h-full cursor-pointer"
                          onClick={() => navigate(`/product/${item.id}`)}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3
                          className="text-white font-medium hover:text-yellow-400 transition-colors cursor-pointer"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-yellow-400">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="h-8 w-8 rounded-full border border-gray-700 text-white flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <button
                          className="h-8 w-8 rounded-full border border-gray-700 text-white flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-0 h-auto"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="p-4 border-t border-gray-700 flex justify-between">
                  <button
                    className="border border-gray-700 text-white hover:bg-[#3b4d71] px-4 py-2 rounded"
                    onClick={() => navigate("/product")}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-4 py-2 rounded"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-[#2c3b5a] rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-4 border-t border-gray-700 flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <input
                      placeholder="Promo Code"
                      className="bg-[#1e2535] border border-gray-700 focus-visible:ring-yellow-400 mb-2 px-4 py-2 rounded w-full text-white"
                    />
                    <button className="w-full bg-[#3b4d71] hover:bg-[#4b5d81] text-white px-4 py-2 rounded mb-4">
                      Apply Code
                    </button>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black flex items-center justify-center gap-2 px-4 py-2 rounded"
                        onClick={() => navigate("/checkout")}
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}