import React from "react";
import Navbar from "../components/Navbar"; // Adjusted import path
import Footer from "../components/Footer"; // Adjusted import path
import { CartProvider } from "../context/CartContext"; // Adjusted import path
import { Outlet } from "react-router-dom"; // React Router's Outlet for nested routes
import Toaster from "../components/ui/toaster"; // Adjusted import path
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main>
            <Outlet /> {/* Renders child routes */}
          </main>
          <Footer />
          <Toaster/>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}