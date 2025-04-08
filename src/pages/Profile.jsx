/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Heart, Clock, Settings, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import {
  getUserProfile,
  getUserOrders,
  getUserBookings,
  getUserCoachingSessions,
  getUserRentals,
  getUserWishlist,
  removeFromWishlist,
} from "@/data/user"
import { getProductById } from "@/data/products"
import { useCart } from "@/context/CartContext"

export default function Profile() {
  const navigator = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const { addToCart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  // User data from database
  const [userProfile, setUserProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [coachingSessions, setCoachingSessions] = useState([])
  const [rentals, setRentals] = useState([])
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Check if user is logged in (only after client-side rendering)
    if (isClient && !isAuthenticated) {
      // User is not authenticated, redirect to login
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile.",
        variant: "destructive",
      })
      navigator("/login")
      return
    }

    // Load user data from auth context
    if (user) {
      console.log("User data loaded:", user) // Debug log
      setUserData({
        name: user.name || "User",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
      })

      // Load user data from database
      if (user.id) {
        const profile = getUserProfile(user.id)
        setUserProfile(profile)

        // Load user orders, bookings, etc.
        setOrders(getUserOrders(user.id))
        setBookings(getUserBookings(user.id))
        setCoachingSessions(getUserCoachingSessions(user.id))
        setRentals(getUserRentals(user.id))
        setWishlist(getUserWishlist(user.id))
      }
    }

    // Check for tab in URL params
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [navigator, searchParams, isAuthenticated, user, isClient])

  const handleLogout = () => {
    logout()
    navigator("/")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()

    // Update profile in auth context
    const success = updateProfile(userData)

    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      })
    } else {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
    navigator(`/profile?tab=${value}`, { scroll: false })
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  // If not authenticated after client-side rendering, show loading or nothing
  if (!isAuthenticated) {
    return null
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <main className="min-h-screen bg-[#1e2535] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="w-full md:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#2c3b5a] border-gray-700 text-white">
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-[#1e2535] border-2 border-yellow-400"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={userProfile?.profileImage || "/placeholder.svg?height=96&width=96"}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </motion.div>
                  <CardTitle className="text-xl text-white">{userData.name}</CardTitle>
                  <CardDescription className="text-gray-400">{userData.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <button
                    variant="ghost"
                    className={`w-full flex justify-start gap-5 items-center p-3 rounded-md ${activeTab === "orders" ? "bg-[#3b4d71] text-yellow-400" : "text-white hover:bg-[#3b4d71] hover:text-white"}`}
                    onClick={() => handleTabChange("orders")}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Orders
                  </button>
                  <button
                    variant="ghost"
                    className={`w-full flex justify-start gap-5 items-center p-3 rounded-md ${activeTab === "wishlist" ? "bg-[#3b4d71] text-yellow-400" : "text-white hover:bg-[#3b4d71] hover:text-white"}`}
                    onClick={() => handleTabChange("wishlist")}
                  >
                    <Heart className="mr-2 h-5 w-5 " />
                    Wishlist
                  </button>
                  <button
                    variant="ghost"
                    className={`w-full flex justify-start gap-5 items-center p-3 rounded-md ${activeTab === "bookings" ? "bg-[#3b4d71] text-yellow-400" : "text-white hover:bg-[#3b4d71] hover:text-white"}`}
                    onClick={() => handleTabChange("bookings")}
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    Booking History
                  </button>
                  <button
                    variant="ghost"
                    className={`w-full flex justify-start gap-5 items-center p-3 rounded-md ${activeTab === "profile" ? "bg-[#3b4d71] text-yellow-400" : "text-white hover:bg-[#3b4d71] hover:text-white"}`}
                    onClick={() => handleTabChange("profile")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </button>
                  <button
                    variant="ghost"
                    className="w-full flex justify-start gap-5 items-center p-3 rounded-md text-red-400 hover:bg-red-900/20 hover:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="w-full md:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="bg-[#2c3b5a] text-white border-b border-gray-700 rounded-t-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
                >
                  Wishlists
                </TabsTrigger>
                <TabsTrigger
                  value="bookings"
                  className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
                >
                  Bookings
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
                >
                  Edit Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                    <CardDescription className="text-gray-400">
                      Welcome back! Here's a summary of your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <h3 className="text-yellow-400 font-medium mb-1">Orders</h3>
                        <p className="text-2xl font-bold">{orders.length}</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <h3 className="text-yellow-400 font-medium mb-1">Wishlist</h3>
                        <p className="text-2xl font-bold">{wishlist.length}</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <h3 className="text-yellow-400 font-medium mb-1">Court Bookings</h3>
                        <p className="text-2xl font-bold">{bookings.length}</p>
                      </motion.div>
                    </div>

                    <h3 className="text-lg font-medium mb-3">Recent Orders</h3>
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="bg-[#1e2535] p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#283245] transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleTabChange("orders")}
                        >
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-400">
                              {formatDate(order.date)} • {order.items.length} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-yellow-400">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">{order.status}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        className="mt-4 bg-[#3b4d71] hover:bg-[#4b5d81] text-white h-10 p-2 rounded-md"
                        onClick={() => handleTabChange("orders")}
                      >
                        View All Orders
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription className="text-gray-400">View and track all your orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="bg-[#1e2535] p-4 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Order {order.id}</h3>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                order.status === "Delivered"
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-blue-900/30 text-blue-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">Placed on {formatDate(order.date)}</p>

                          <div className="space-y-2 mb-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                  {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                </span>
                                <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between border-t border-gray-700 pt-2">
                            <p>
                              Total: <span className="text-yellow-400">${order.total.toFixed(2)}</span>
                            </p>
                            <button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-white hover:bg-[#3b4d71] h-10 p-2 rounded-md"
                            >
                              View Details
                            </button>
                          </div>
                        </motion.div>
                      ))}

                      {orders.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <p>You haven't placed any orders yet.</p>
                          <button
                            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black h-10 p-2 rounded-md"
                            onClick={() => navigator("/product")}
                          >
                            Browse Products
                          </button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription className="text-gray-400">
                      Items you've saved for later. Add them to your cart when you're ready to purchase.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map((item, index) => {
                          // Get product details from the product ID
                          const product = getProductById(item.productId)
                          if (!product) return null

                          return (
                            <motion.div
                              key={item.productId}
                              className="bg-[#1e2535] rounded-lg overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ y: -5 }}
                            >
                              <div className="relative h-50 w-full flex justify-center items-center">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-4 h-full"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-white mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center mb-3">
                                  <div className="text-yellow-400 font-bold">${product.price.toFixed(2)}</div>
                                  <div className="text-xs text-gray-400">Added on {formatDate(item.dateAdded)}</div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-gray-700 text-white hover:bg-[#3b4d71] h-10 p-2 rounded-md"
                                    onClick={() => {
                                      // Remove from wishlist
                                      removeFromWishlist(user.id, item.productId)
                                      // Update local state
                                      setWishlist(wishlist.filter((i) => i.productId !== item.productId))
                                      toast({
                                        title: "Removed from wishlist",
                                        description: `${product.name} has been removed from your wishlist.`,
                                      })
                                    }}
                                  >
                                    Remove
                                  </button>
                                  <button
                                    size="sm"
                                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black h-10 p-2 rounded-md"
                                    onClick={() => {
                                      // Add to cart
                                      addToCart(product)
                                      toast({
                                        title: "Added to cart",
                                        description: `${product.name} has been added to your cart.`,
                                      })
                                    }}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <p>Your wishlist is empty.</p>
                        <button
                          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black h-10 p-2 rounded-md"
                          onClick={() => navigator("/product")}
                        >
                          Browse Products
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              

              <TabsContent value="bookings" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>Court Bookings & Services</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your court reservations, coaching sessions, and equipment rentals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Court Bookings */}
                      <div>
                        <h3 className="text-lg font-medium text-yellow-400 mb-3">Court Bookings</h3>
                        <div className="space-y-4">
                          {bookings.map((booking, index) => (
                            <motion.div
                              key={booking.id}
                              className="bg-[#1e2535] p-4 rounded-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">{booking.courtId} Reservation</h3>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    booking.status === "Upcoming"
                                      ? "bg-green-900/30 text-green-400"
                                      : "bg-gray-900/30 text-gray-400"
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">
                                {formatDate(booking.date)} • {booking.startTime} - {booking.endTime}
                              </p>
                              <div className="flex justify-between">
                                <p>{booking.package} Package</p>
                                <button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-white hover:bg-[#3b4d71] rounded-md h-10 p-2"
                                  disabled={booking.status !== "Upcoming"}
                                >
                                  {booking.status === "Upcoming" ? "Reschedule" : "View Details"}
                                </button>
                              </div>
                            </motion.div>
                          ))}

                          {bookings.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                              <p>No court bookings found.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Coaching Sessions */}
                      <div>
                        <h3 className="text-lg font-medium text-yellow-400 mb-3">Coaching Sessions</h3>
                        <div className="space-y-4">
                          {coachingSessions.map((session, index) => (
                            <motion.div
                              key={session.id}
                              className="bg-[#1e2535] p-4 rounded-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Professional Coaching</h3>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    session.status === "Upcoming"
                                      ? "bg-green-900/30 text-green-400"
                                      : "bg-gray-900/30 text-gray-400"
                                  }`}
                                >
                                  {session.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">
                                {formatDate(session.date)} • {session.startTime} - {session.endTime}
                              </p>
                              <div className="flex justify-between">
                                <p>Coach: {session.coachId}</p>
                                <button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-white hover:bg-[#3b4d71] rounded-md h-10 p-2"
                                  disabled={session.status !== "Upcoming"}
                                >
                                  {session.status === "Upcoming" ? "Reschedule" : "View Details"}
                                </button>
                              </div>
                            </motion.div>
                          ))}

                          {coachingSessions.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                              <p>No coaching sessions found.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Equipment Rentals */}
                      <div>
                        <h3 className="text-lg font-medium text-yellow-400 mb-3">Equipment Rentals</h3>
                        <div className="space-y-4">
                          {rentals.map((rental, index) => (
                            <motion.div
                              key={rental.id}
                              className="bg-[#1e2535] p-4 rounded-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Equipment Rental</h3>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    rental.status === "Upcoming"
                                      ? "bg-green-900/30 text-green-400"
                                      : "bg-gray-900/30 text-gray-400"
                                  }`}
                                >
                                  {rental.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{formatDate(rental.date)}</p>
                              <div className="space-y-1 mb-3">
                                {rental.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-gray-300">
                                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                    </span>
                                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between border-t border-gray-700 pt-2">
                                <p>
                                  Total: <span className="text-yellow-400">${rental.total.toFixed(2)}</span>
                                </p>
                                <button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-700 text-white hover:bg-[#3b4d71] h-10 rounded-md p-2"
                                >
                                  View Details
                                </button>
                              </div>
                            </motion.div>
                          ))}

                          {rentals.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                              <p>No equipment rentals found.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black h-10 rounded-md"
                          onClick={() => navigator("/services")}
                        >
                          Book New Session
                        </button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name">Full Name</label>
                            <input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleChange}
                              className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <input
                              id="email"
                              name="email"
                              value={userData.email}
                              onChange={handleChange}
                              className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="phone">Phone Number</label>
                              <input
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="address">Address</label>
                              <input
                                id="address"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                                className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="city">City</label>
                            <input
                              id="city"
                              name="city"
                              value={userData.city}
                              onChange={handleChange}
                              className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="state">State</label>
                            <input
                              id="state"
                              name="state"
                              value={userData.state}
                              onChange={handleChange}
                              className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="zip">ZIP Code</label>
                            <input
                              id="zip"
                              name="zip"
                              value={userData.zip}
                              onChange={handleChange}
                              className="bg-[#1e2535] border-gray-700 px-3 py-2 rounded pr-10 w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          variant="outline"
                          className="text-white hover:bg-[#3b4d71] h-10 p-2 px-4 rounded-md border border-white"
                        >
                          Cancel
                        </button>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black h-10 p-2 px-4 rounded-md">
                            Save Changes
                          </button>
                        </motion.div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </main>
  )
}