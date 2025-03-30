/* eslint-disable react-refresh/only-export-components */
"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext(undefined);

// Create a provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  
    try {
      // Clear the cart from localStorage on website restart
      localStorage.removeItem("cart");
      setCartItems([]); // Reset cart items to an empty array
    } catch (error) {
      console.error("Failed to reset cart on restart:", error);
      setCartItems([]);
    }
  }, []);


  // Initialize cart from localStorage on client-side
  useEffect(() => {
    setIsClient(true);
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to update cart in localStorage:", error);
      }
    }
  }, [cartItems, isClient]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}