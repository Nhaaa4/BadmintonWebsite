// Order data structure that relates users with products
const orders = [
  {
    id: "ORD-1234",
    userId: 1,
    date: "2025-03-15",
    status: "Delivered",
    items: [
      { productId: 1, name: "Yonex Astrox 99", price: 200.0, quantity: 1 },
      {
        productId: 4,
        name: "Li-Ning Grip Master Pro",
        price: 15.0,
        quantity: 2,
      },
      { productId: 3, name: "Yonex Aerosensa 50", price: 30.0, quantity: 1 },
    ],
    subtotal: 245.0,
    tax: 19.6,
    shipping: 0,
    total: 264.6,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-9876",
    userId: 1,
    date: "2025-02-28",
    status: "Processing",
    items: [
      { productId: 6, name: "Li-Ning Windstorm 72", price: 120.0, quantity: 1 },
      {
        productId: 10,
        name: "Yonex Power Cushion Insole",
        price: 25.0,
        quantity: 1,
      },
    ],
    subtotal: 145.0,
    tax: 11.6,
    shipping: 0,
    total: 156.6,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-5432",
    userId: 1,
    date: "2025-01-10",
    status: "Delivered",
    items: [
      {
        productId: 8,
        name: "Yonex Tournament Shirt",
        price: 45.0,
        quantity: 1,
      },
      { productId: 13, name: "Victor Team Shorts", price: 40.0, quantity: 1 },
    ],
    subtotal: 85.0,
    tax: 6.8,
    shipping: 0,
    total: 91.8,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
  },
];

// Helper functions
export function getOrdersByUserId(userId) {
  return orders.filter((order) => order.userId === userId);
}

export function getOrderById(orderId) {
  return orders.find((order) => order.id === orderId);
}

export function createOrder(orderData) {
  // Generate a new order ID
  const orderNumber = Math.floor(10000 + Math.random() * 90000);
  const newOrderId = `ORD-${orderNumber}`;

  // Create the new order
  const newOrder = {
    id: newOrderId,
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    ...orderData,
  };

  // Add to orders array
  orders.push(newOrder);

  return newOrderId;
}

export default orders;