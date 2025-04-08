/* eslint-disable react-refresh/only-export-components */
"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authenticateUser, createAccount, updateAccount } from "@/data/account"
import { getUserProfile } from "@/data/user"

// Create the context
const AuthContext = createContext(undefined)

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Try to get current user from localStorage
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error)
          localStorage.removeItem("currentUser")
        }
      }
    }

    setIsLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // Authenticate user
    const authenticatedUser = authenticateUser(email, password)

    if (authenticatedUser) {
      // Get additional user profile data
      const userProfile = getUserProfile(authenticatedUser.id)

      // Combine account and profile data
      const userData = {
        ...authenticatedUser,
        ...(userProfile
          ? {
              phone: userProfile.phone,
              address: userProfile.address,
              city: userProfile.city,
              state: userProfile.state,
              zip: userProfile.zip,
            }
          : {}),
      }

      // Set user in state and localStorage
      setUser(userData)
      localStorage.setItem("currentUser", JSON.stringify(userData))

      return true
    }

    return false
  }

  // Register function
  const register = (userData) => {
    // Create new account
    const result = createAccount({
      name:
        userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.name || "",
      email: userData.email,
      password: userData.password,
    })

    if (result.success) {
      // Create user data with profile information
      const newUserData = {
        ...result.account,
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        zip: userData.zip || "",
      }

      // Set user in state and localStorage
      setUser(newUserData)
      localStorage.setItem("currentUser", JSON.stringify(newUserData))

      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  // Update user profile
  const updateProfile = (updatedData) => {
    if (!user) return false

    // Update account in the database
    const result = updateAccount(user.id, {
      name: updatedData.name,
      // Note: In a real app, you would also update the user profile in dataUser.js
    })

    if (result.success) {
      // Update current user with new data
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      return true
    }

    return false
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

