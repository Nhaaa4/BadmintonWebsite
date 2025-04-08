/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams} from "react-router-dom"	 
import { Heart, Minus, Plus, ArrowLeft, Star, Share2, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useCart } from "../context/CartContext"
import { motion } from "framer-motion"
import { toast } from "../components/ui/use-toast"
import { ToastAction } from "../components/ui/toast"
import { getProductById, getRelatedProducts } from "@/data/products"
import { useAuth } from "@/context/AuthContext"
import { addToWishlist } from "@/data/user"

export default function ProductDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Fetch product data
    const productId = Number.parseInt(params.id)
    const foundProduct = getProductById(productId)

    if (foundProduct) {
      setProduct(foundProduct)

      // Get related products
      const related = getRelatedProducts(productId)
      setRelatedProducts(related)
    }

    setLoading(false)
  }, [params.id])
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!isMounted) return

    if (product) {
      addToCart({ ...product, quantity });
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} has been added to your cart.`,
        action: (
          <ToastAction altText="View Cart" onClick={() => navigate("/cart")}>
            View Cart
          </ToastAction>
        ),
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e2535] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1e2535] py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">Product Not Found</h1>
          <p className="text-white mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black">Return to Shop</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#1e2535] py-12 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <button variant="ghost" className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 text-white hover:text-yellow-400 mb-6 hover:border hover:border-white" onClick={() => navigate('/product')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div
            className="bg-[#2c3b5a] rounded-lg p-8 flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={400}
              className="object-contain"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="text-sm text-yellow-400 mb-2">{product.category}</div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm ml-2">
                {product.rating}/5 ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-gray-300 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-2xl font-bold text-yellow-400">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-gray-400 line-through ml-3">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="ml-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="mb-6">
              <div className="text-white mb-2">
                Availability:
                <span className={product.stock > 0 ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="flex items-center border border-gray-700 rounded-md mr-4">
                <button
                  variant="ghost"
                  size="icon"
                  className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-white hover:text-yellow-400 h-10 w-10"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-white">{quantity}</span>
                <button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-yellow-400 h-10 w-10"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                className="rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || !isMounted}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                variant="outline"
                size="icon"
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 w-10 ml-2 border-gray-700 text-white hover:text-yellow-400 hover:border-yellow-400 border"  
                onClick={() => {
                  if (isAuthenticated && user) {
                    const added = addToWishlist(user.id, product.id)
                    if (added) {
                      toast({
                        title: "Added to Wishlist",
                        description: `${product.name} has been added to your wishlist.`,
                        variant: "success"
                      })
                    }
                  } else {
                    toast({
                      title: "Login Required",
                      description: "Please log in to add items to your wishlist.",
                      variant: "destructive",
                      action: (
                        <ToastAction altText="Login" onClick={() => navigate("/login")}>
                          Login
                        </ToastAction>
                      ),
                    })
                  }
                }}
              >
                <Heart className="h-4 w-4" />
              </button>

              <button
                variant="outline"
                size="icon"
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 w-10 ml-2 border-gray-700 text-white hover:text-yellow-400 hover:border-yellow-400"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="bg-[#2c3b5a] text-white border-b border-gray-700 rounded-t-lg">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="bg-[#2c3b5a] p-6 rounded-b-lg text-white">
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">{product.longDescription || product.description}</p>

              {product.features && product.features.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-yellow-400 mt-6 mb-4">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="bg-[#2c3b5a] p-6 rounded-b-lg text-white">
            {product.specifications ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-700 pb-2">
                    <span className="text-gray-400 capitalize">{key}: </span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No specifications available for this product.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="bg-[#2c3b5a] p-6 rounded-b-lg text-white">
            <div className="flex items-center mb-6">
              <div className="text-4xl font-bold text-yellow-400 mr-4">{product.rating}</div>
              <div>
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">Based on {product.reviewCount} reviews</div>
              </div>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black mb-6">Write a Review</button>

            <div className="text-center text-gray-400 py-8">
              <p>Reviews will be shown here. This is a demo product page.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <motion.div
                  key={relProduct.id}
                  className="border border-gray-700 rounded-lg p-4 bg-[#2c3b5a] hover:border-yellow-400 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div
                    className="mb-4 flex justify-center cursor-pointer"
                    onClick={() => navigate(`/product/${relProduct.id}`)}
                  >
                    <img
                      src={relProduct.image || "/placeholder.svg"}
                      alt={relProduct.name}
                      width={120}
                      height={150}
                    />
                  </div>
                  <div
                    className="text-white mb-1 font-medium cursor-pointer hover:text-yellow-400 transition-colors"
                    onClick={() => navigate(`/product/${relProduct.id}`)}
                  >
                    {relProduct.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{relProduct.description}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-yellow-400 font-bold">${relProduct.price.toFixed(2)}</div>
                    <button
                      size="sm"
                      className="flex items-center justify-center gap-2 text-sm font-medium transition-colors h-9 rounded-md px-3 bg-yellow-400 hover:bg-yellow-500 text-black"
                      onClick={() => {
                        if (isMounted) {
                          addToCart({ ...relProduct, quantity: 1 })
                          toast({
                            title: "Added to cart",
                            description: `${relProduct.name} has been added to your cart.`,
                          })
                        }
                      }}
                      disabled={!isMounted}
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

