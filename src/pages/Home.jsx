/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import badmintonHero from "../assets/hero-badminton.jpg";
import badmintonCourt from "../assets/badminton-court.jpg";
import { bestsellerProducts, blogPosts } from "@/data/products";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Home() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false)
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true)
  }, [])
  

  const handleAddToCart = (product) => {
    if (!isMounted) return

    // Create a product object with quantity 1 to be explicit
    const productWithQuantity = {...product, quantity: 1 }
    addToCart(productWithQuantity)
    toast({
      title: "Added to cart.",
      description: `${product.name} has been added to your cart.`,
      action: (
        <ToastAction altText="View Cart" onClick={() => navigate('/cart')}>
          View Cart
        </ToastAction>
      )
    })
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBookCourt = () => {
    navigate("/services");
    toast({
      title: "Court Booking",
      description: "You're being redirected to our services page to book a court.",
    })
  };

  return (
    <main className="min-h-screen bg-[#1e2535]">
      {/* Hero Section */}
      <motion.section
        className="relative h-[90vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={badmintonHero}
          alt="Badminton Player"
          className="absolute inset-0 w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
              WE&apos;RE HERE
              <br /> TO MAKE IT FAIR
            </h1>
            <p className="text-white max-w-lg mb-6">
              "Badminton is not just a game, it&apos;s a battle of speed,
              strategy, and stamina. Every shuttle counts, every point matters."
            </p>
            <motion.button
              className="bg-[#3b4d71] hover:bg-yellow-400 text-white hover:text-[#3b4d71] rounded-2xl w-fit px-8 py-2"
              onClick={() => navigate("/services")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PLAY NOW!
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 px-6 md:px-20 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-yellow-400 mb-12 tracking-tight">
            Court
          </h2>
          <div
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={handleBookCourt}
          >
            <img
              src={badmintonCourt}
              alt="Badminton Court"
              className="w-full h-[80vh] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg font-light leading-relaxed max-w-2xl">
                  Discover our five state-of-the-art badminton courts, crafted
                  for players of every level. From casual fun to competitive
                  play, our modern facilities elevate your game in style and
                  comfort.
                </p>
                <motion.button
                  className="mt-6 bg-yellow-400 text-gray-900 hover:text-yellow-400 font-medium px-6 py-3 rounded-full shadow-md hover:bg-[#3b4d71] transition-colors duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Court Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bestseller Section */}
      <section className="py-12 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">Bestseller</h2>
            <Link to="/product">
              <button className="text-white border border-white hover:bg-[#2c3b5a] px-4 py-2 rounded">
                View More
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="border border-yellow-400 rounded-lg p-4 bg-[#1e2535] hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
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
                  <div className="text-gray-400 text-xs">{product.rating}</div>
                </div>
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black flex items-center justify-center gap-2 group px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                  disabled={!isMounted}
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Add To Cart
                  </span>
                  <ShoppingCart
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="py-12 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            Our Blog
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="text-white bg-[#2c3b5a] p-6 rounded-lg hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
              >
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                <Link to="#">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    Read More →
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
