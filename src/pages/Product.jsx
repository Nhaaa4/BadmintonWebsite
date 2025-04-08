/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { toast } from "../components/ui/use-toast"; 
import { ToastAction } from "../components/ui/toast"; 
import { products } from "../data/products"; 
import { useAuth } from "@/context/AuthContext";
import { addToWishlist } from "@/data/user";


export default function Product() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth()
  const [sortOption, setSortOption] = useState("popularity");

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default: // popularity
        return 0; // Keep original order
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: (
        <ToastAction altText="View Cart" onClick={() => navigate("/cart")}>
          View Cart
        </ToastAction>
      ),
    })
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToWishlist = (userId, productId, product) => {
    if (isAuthenticated && user) {
      const success = addToWishlist(userId, productId)
      if (success) {
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        })
      }
      return success
    }
    return false
  }

  return (
    <main className="min-h-screen bg-[#1e2535] pb-16">
      <section className="py-12 px-6 md:px-16">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">Shop</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            Showing all{" "}
            <span className="text-yellow-400">{products.length}</span> results
          </div>
          <select
            className="bg-[#2c3b5a] text-white border border-gray-600 rounded px-4 py-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popularity">Sort by popularity</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
            <option value="newest">Sort by newest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="border border-yellow-400 rounded-lg p-4 bg-[#1e2535] hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div
                className="mb-4 flex justify-center cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-auto h-48 object-cover"
                />
              </div>
              <div
                className="text-white mb-1 font-medium cursor-pointer hover:text-yellow-400 transition-colors"
                onClick={() => handleProductClick(product.id)}
              >
                {product.name}
              </div>
              <div className="text-xs text-gray-400 mb-2">
                {product.description}
              </div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-yellow-400 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-xs ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">{product.rating}/5 ({product.reviewCount})</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black flex items-center justify-center gap-2 group px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                  >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Add To Cart
                  </span>
                  <ShoppingCart
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                    />
                </button>
                <button
                  variant="ghost"
                  className="w-full text-white hover:text-yellow-400 flex items-center justify-center gap-2 border border-white h-10 rounded px-4 py-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isAuthenticated && user) {
                      handleAddToWishlist(user.id, product.id, product)
                    } else {
                      toast({
                        title: "Login Required",
                        description: "Please log in to add items to your wishlist.",
                        action: (
                          <ToastAction altText="Login" onClick={() => navigate("/login")}>
                            Login
                          </ToastAction>
                        ),
                      })
                    }
                  }}
                  >
                  <Heart size={16} className="text-red-400" />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
