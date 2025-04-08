import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams()
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "ORD-" + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toLocaleDateString(),
    total: "$0.00",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping (3-5 business days)",
  })

  useEffect(() => {
    // Try to get order details from localStorage
    const storedOrderDetails = localStorage.getItem("orderDetails")

    if (storedOrderDetails) {
      try {
        const parsedDetails = JSON.parse(storedOrderDetails)
        setOrderDetails(parsedDetails)

        // Clear the stored order details to prevent showing old orders on refresh
        localStorage.removeItem("orderDetails")
      } catch (error) {
        console.error("Failed to parse order details:", error)
      }
    } else {
      // Fallback to URL parameter if localStorage is not available
      const orderId = searchParams.get("orderId")
      if (orderId) {
        setOrderDetails((prev) => ({
          ...prev,
          orderNumber: orderId,
        }))
      }
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-[#1e2535] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#2c3b5a] rounded-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-900/30 mb-6">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div className="inline-block bg-[#1e2535] rounded-lg px-4 py-2 text-yellow-400 font-medium mb-8">
              Order #{orderDetails.orderNumber}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Order Date</p>
                <p className="text-white">{orderDetails.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-white">{orderDetails.total}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Payment Method</p>
                <p className="text-white">{orderDetails.paymentMethod}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Shipping Method</p>
                <p className="text-white">{orderDetails.shippingMethod}</p>
              </div>
            </div>

            <p className="text-gray-400 mb-8">
              A confirmation email has been sent to your email address with all the order details.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/profile">
                <button className="bg-[#3b4d71] hover:bg-[#4b5d81] text-white px-4 py-2 rounded flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Order
                </button>
              </Link>
              <Link to="/product">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}