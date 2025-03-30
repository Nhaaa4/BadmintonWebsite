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
} from "@/data/user"
import thouk from "../assets/thouk.png"

export default function Profile() {
  const navigator = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
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
    // Check if user is logged in
    if (!isAuthenticated && isClient) {
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
      setUserData({
        name: user.name || "",
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

  if (!isAuthenticated) {
    return null
  }

  const recentOrders = [
    { id: "ORD-1234", date: "Mar 15, 2025", status: "Delivered", total: "$245.00", items: 3 },
    { id: "ORD-9876", date: "Feb 28, 2025", status: "Processing", total: "$120.50", items: 2 },
    { id: "ORD-5432", date: "Jan 10, 2025", status: "Delivered", total: "$78.00", items: 1 },
  ]

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
                      src={thouk}
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
                        <p className="text-2xl font-bold">3</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <h3 className="text-yellow-400 font-medium mb-1">Wishlist</h3>
                        <p className="text-2xl font-bold">7</p>
                      </motion.div>
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <h3 className="text-yellow-400 font-medium mb-1">Court Bookings</h3>
                        <p className="text-2xl font-bold">2</p>
                      </motion.div>
                    </div>

                    <h3 className="text-lg font-medium mb-3">Recent Orders</h3>
                    <div className="space-y-3">
                      {recentOrders.map((order, index) => (
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
                              {order.date} • {order.items} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-yellow-400">{order.total}</p>
                            <p className="text-sm text-gray-400">{order.status}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        className="mt-4 hover:bg-[#4b5d81] text-white h-10 p-2 rounded-md border border-white"
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
                      {recentOrders.map((order, index) => (
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
                          <p className="text-sm text-gray-400 mb-2">Placed on {order.date}</p>
                          <div className="flex justify-between">
                            <p>
                              Total: <span className="text-yellow-400">{order.total}</span>
                            </p>
                            <button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-white hover:bg-[#3b4d71] hover:border hover:border-white h-8 p-1 rounded-md"
                            >
                              View Details
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="mt-4">
                <Card className="bg-[#2c3b5a] border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle>Court Bookings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your court reservations and coaching sessions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Court #3 Reservation</h3>
                          <span className="px-2 py-1 rounded text-xs bg-green-900/30 text-green-400">Upcoming</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">March 30, 2025 • 6:00 PM - 8:00 PM</p>
                        <div className="flex justify-between">
                          <p>Standard Package</p>
                          <button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-[#3b4d71] hover:border hover:border-white h-8 p-1 rounded-md"> 
                            Reschedule
                          </button>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-[#1e2535] p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(252, 211, 77, 0.1)" }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Professional Coaching</h3>
                          <span className="px-2 py-1 rounded text-xs bg-green-900/30 text-green-400">Upcoming</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">April 2, 2025 • 5:30 PM - 6:30 PM</p>
                        <div className="flex justify-between">
                          <p>Coach: Alex Johnson</p>
                          <button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-[#3b4d71] hover:border hover:border-white h-8 p-1 rounded-md">
                            Reschedule
                          </button>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} >
                        <button className=" bg-yellow-400 hover:bg-yellow-500 text-black h-10 p-2 rounded-md">
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