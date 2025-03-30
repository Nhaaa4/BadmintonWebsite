/* eslint-disable no-unused-vars */

"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, ShoppingCart, User, LogOut, Heart, Settings, ShoppingBag, LogIn, UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logo.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function Navbar() {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const {user, isAuthenticated, logout} = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location]) // Re-check when location changes

  // Update cart count
  useEffect(() => {
    setCartCount(getTotalItems())
  }, [getTotalItems])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated:", user)
    } else {
      console.log("User is not authenticated")
    }
  }, [isAuthenticated, user])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
    { name: "Services", path: "/services" },
    { name: "Rental", path: "/rental" },
    { name: "About", path: "/about" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1e2535]/95 backdrop-blur-sm shadow-lg" : "bg-[#1e2535]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="mr-6">
                <img src={logo} alt="Badminton Logo" width={50} height={50} />
              </motion.div>
            </Link>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <motion.span
                    className={`${
                      (item.path === "/" && location === "/") || (item.path !== "/" && location.startsWith(item.path)) ? "text-yellow-400" : "text-white hover:text-yellow-400 "
                    } transition-colors duration-200 relative`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.name}
                    {((item.path === "/" && location === "/") || (item.path !== "/" && location.startsWith(item.path))) && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400"
                        layoutId="underline"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-yellow-400 font-bold text-xl hidden sm:block">Fair Play</div>

            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <button variant="ghost" className="relative p-2 text-white hover:text-yellow-400">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute top-0 right-0 h-4 w-4 text-xs bg-yellow-400 text-black rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      key={cartCount}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </motion.div>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <button variant="ghost" className="text-white hover:text-yellow-400 p-2 relative">
                      <User className="h-5 w-5" />
                      <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
                    </button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#2c3b5a] border-gray-700 text-white">
                  <DropdownMenuLabel className="text-yellow-400">{user?.name || "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="hover:bg-[#3b4d71] cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#3b4d71] cursor-pointer"
                    onClick={() => navigate("/profile?tab=orders")}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#3b4d71] cursor-pointer"
                    onClick={() => navigate("/profile?tab=wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#3b4d71] cursor-pointer"
                    onClick={() => navigate("/profile?tab=profile")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="hover:bg-red-900/20 text-red-400 hover:text-red-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login">
                    <button variant="outline" className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 px-4 py-2 border-gray-600 text-white hover:bg-[#3b4d71]">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register">
                    <button variant="outline" className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </button>
                  </Link>
                </motion.div>
              </div>
            )}

            <motion.button
              className="md:hidden text-white hover:text-yellow-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-[#2c3b5a] shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: navItems.indexOf(item) * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`${
                      location === item.path
                        ? "bg-[#3b4d71] text-yellow-400"
                        : "text-white hover:bg-[#3b4d71] hover:text-yellow-400"
                    } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {isAuthenticated ? (
                <>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                  >
                    <div className="border-t border-gray-700 my-2 pt-2"></div>
                    <Link
                      to="/profile"
                      className="flex items-center text-white hover:bg-[#3b4d71] hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: (navItems.length + 1) * 0.05 }}
                  >
                    <button
                      className="flex w-full items-center text-red-400 hover:bg-red-900/20 hover:text-red-300 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                  >
                    <div className="border-t border-gray-700 my-2 pt-2"></div>
                    <Link
                      to="/login"
                      className="flex items-center text-black hover:bg-[#3b4d71] hover:text-yellow-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: (navItems.length + 1) * 0.05 }}
                  >
                    <Link
                      to="/register"
                      className="flex items-center text-yellow-400 hover:bg-yellow-400/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

