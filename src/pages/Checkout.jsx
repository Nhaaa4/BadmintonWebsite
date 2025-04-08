/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext"
import { getUserProfile } from "@/data/user"
import { useCart } from "@/context/CartContext"
import { createOrder } from "@/data/orderDetail"
import { toast } from "@/components/ui/use-toast"

export default function Checkout() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { cartItems, getSubtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "credit",
    saveInfo: false,
  });
  const [loading, setLoading] = useState(false)

  // Auto-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Get user profile data
      const userProfile = getUserProfile(user.id)

      if (userProfile) {
        // Split name into first and last name
        const nameParts = userProfile.name.split(" ")
        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        setFormData({
          ...formData,
          firstName,
          lastName,
          email: userProfile.email || user.email || "",
          phone: userProfile.phone || "",
          address: userProfile.address || "",
          city: userProfile.city || "",
          state: userProfile.state || "",
          zip: userProfile.zip || "",
        })
      } else {
        // If no profile exists, at least use the basic user data
        const nameParts = user.name ? user.name.split(" ") : ["", ""]
        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        setFormData({
          ...formData,
          firstName,
          lastName,
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          zip: user.zip || "",
        })
      }
    }
  }, [isAuthenticated, user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, saveInfo: e.target.checked }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Calculate order totals
    const subtotal = getSubtotal()
    const tax = subtotal * 0.08 // 8% tax
    const shipping = 0 // Free shipping
    const total = subtotal + tax + shipping

    // Create order data
    const orderData = {
      userId: isAuthenticated ? user.id : null,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod === "credit" ? "Credit Card" : "PayPal",
    }

    // Simulate API call
    setTimeout(() => {
      try {
        // Create the order
        const orderId = createOrder(orderData)

        // Store order details in localStorage for the confirmation page
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            orderNumber: orderId,
            date: new Date().toLocaleDateString(),
            total: `$${total.toFixed(2)}`,
            paymentMethod: orderData.paymentMethod,
            shippingMethod: "Standard Shipping (3-5 business days)",
          }),
        )

        // Clear the cart
        clearCart()

        // Show success message
        toast({
          title: "Order Placed Successfully",
          description: `Your order #${orderId} has been placed.`,
          variant: "success",
        })

        // Redirect to confirmation page
        navigate(`/checkout/confirmation?orderId=${orderId}`)
      } catch (error) {
        toast({
          title: `Error: ${error.message}`,
          description: "There was a problem placing your order. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }, 1500)
  }

  // Calculate cart summary
  const subtotal = getSubtotal()
  const tax = subtotal * 0.08 // 8% tax
  const shipping = 0 // Free shipping
  const total = subtotal + tax + shipping

  return (
    <main className="min-h-screen bg-[#1e2535] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-[#2c3b5a] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-white">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-white">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-white">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-white">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-white">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-white">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="zip" className="text-white">
                        ZIP Code
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleCheckboxChange}
                      className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 rounded"
                    />
                    <label htmlFor="saveInfo" className="text-white text-sm">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#2c3b5a] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Payment Method</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-[#1e2535] p-4 rounded-lg border border-gray-700">
                      <input
                        type="radio"
                        id="credit"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === "credit"}
                        onChange={handleRadioChange}
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2"
                      />
                      <label htmlFor="credit" className="text-white flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Credit / Debit Card
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 bg-[#1e2535] p-4 rounded-lg border border-gray-700">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleRadioChange}
                        className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2"
                      />
                      <label htmlFor="paypal" className="text-white">
                        PayPal
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="cardNumber" className="text-white">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="expiry" className="text-white">
                            Expiry Date
                          </label>
                          <input
                            id="expiry"
                            required
                            placeholder="MM/YY"
                            className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="cvc" className="text-white">
                            CVC
                          </label>
                          <input
                            id="cvc"
                            required
                            placeholder="123"
                            className="bg-[#1e2535] border border-gray-700 focus:ring-yellow-400 focus:ring-2 p-2 rounded w-full text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Link to="/cart">
                  <button
                    type="button"
                    className="border border-gray-700 text-white hover:bg-[#3b4d71] px-4 py-2 rounded"
                  >
                    Back to Cart
                  </button>
                </Link>
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#2c3b5a] rounded-lg overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Order Summary</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-white text-sm">
                      <span>
                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}