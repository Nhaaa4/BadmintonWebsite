
import panha from "../assets/panha.png"
// User profiles data structure
const userProfiles = [
    {
      id: 1,
      userId: 1, // References the account ID in dataAccount.js
      name: "John Doe",
      email: "user@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      profileImage: "",
      memberSince: "2023-01-15",
      preferences: {
        notifications: true,
        newsletter: true,
        marketingEmails: false,
      },
    },
    {
      id: 2,
      userId: 2, // References the account ID in dataAccount.js
      name: "Panha Sovan",
      email: "panhasovan51@gmail.com",
      phone: "(+885) 972-716-722",
      address: "National Road 1",
      city: "Phnom Penh",
      state: "PP",
      zip: "94105",
      profileImage: panha,
      memberSince: "2022-11-05",
      preferences: {
        notifications: true,
        newsletter: true,
        marketingEmails: true,
      },
    },
  ]
  
  // Order history data structure
  const orders = [
    {
      id: "ORD-1234",
      userId: 1,
      date: "2025-03-15",
      status: "Delivered",
      items: [
        { productId: 1, name: "Yonex Astrox 99", price: 200.0, quantity: 1 },
        { productId: 4, name: "Li-Ning Grip Master Pro", price: 15.0, quantity: 2 },
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
        { productId: 10, name: "Yonex Power Cushion Insole", price: 25.0, quantity: 1 },
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
      },
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-5432",
      userId: 1,
      date: "2025-01-10",
      status: "Delivered",
      items: [
        { productId: 8, name: "Yonex Tournament Shirt", price: 45.0, quantity: 1 },
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
      },
      paymentMethod: "Credit Card",
    },
  ]
  
  // Court bookings data structure
  const courtBookings = [
    {
      id: 1,
      userId: 1,
      courtId: "Court 3",
      date: "2025-03-30",
      startTime: "18:00",
      endTime: "20:00",
      status: "Upcoming",
      package: "Standard",
      price: 35.0,
      players: 4,
      notes: "Bringing own equipment",
    },
    {
      id: 2,
      userId: 1,
      courtId: "Court 1",
      date: "2025-03-15",
      startTime: "10:00",
      endTime: "11:00",
      status: "Completed",
      package: "Basic",
      price: 20.0,
      players: 2,
      notes: "",
    },
  ]
  
  // Coaching sessions data structure
  const coachingSessions = [
    {
      id: 1,
      userId: 1,
      coachId: "Alex Johnson",
      date: "2025-04-02",
      startTime: "17:30",
      endTime: "18:30",
      status: "Upcoming",
      type: "Individual",
      price: 50.0,
      focus: "Smash technique",
      notes: "Intermediate level",
    },
    {
      id: 2,
      userId: 1,
      coachId: "Samantha Lee",
      date: "2025-03-20",
      startTime: "16:00",
      endTime: "17:00",
      status: "Completed",
      type: "Individual",
      price: 50.0,
      focus: "Footwork",
      notes: "Focus on defensive movement",
    },
  ]
  
  // Equipment rentals data structure
  const equipmentRentals = [
    {
      id: 1,
      userId: 1,
      date: "2025-03-30",
      items: [
        { itemId: 1, name: "Premium Racket", quantity: 2, price: 10.0 },
        { itemId: 4, name: "Shuttlecocks", quantity: 1, price: 5.0 },
      ],
      duration: 2, // hours
      total: 25.0,
      status: "Upcoming",
      deposit: 50.0,
      notes: "Will pick up 15 minutes before court booking",
    },
    {
      id: 2,
      userId: 1,
      date: "2025-03-15",
      items: [
        { itemId: 1, name: "Premium Racket", quantity: 2, price: 10.0 },
        { itemId: 2, name: "Court Shoes", quantity: 1, size: "US 9", price: 8.0 },
      ],
      duration: 1, // hours
      total: 28.0,
      status: "Completed",
      deposit: 50.0,
      depositReturned: true,
      notes: "",
    },
  ]
  
  // Wishlist data structure
  const wishlist = [
    {
      userId: 1,
      items: [
        { productId: 2, dateAdded: "2025-03-10" },
        { productId: 5, dateAdded: "2025-03-05" },
        { productId: 7, dateAdded: "2025-02-28" },
        { productId: 9, dateAdded: "2025-02-20" },
        { productId: 11, dateAdded: "2025-02-15" },
        { productId: 14, dateAdded: "2025-02-10" },
        { productId: 15, dateAdded: "2025-02-05" },
      ],
    },
    {
      userId: 2,
      items: [
        { productId: 1, dateAdded: "2025-03-12" },
        { productId: 3, dateAdded: "2025-03-01" },
        { productId: 8, dateAdded: "2025-02-25" },
      ],
    },
  ]
  
  // Export all data
  export { userProfiles, orders, courtBookings, coachingSessions, equipmentRentals, wishlist }
  
  // Helper functions
  export function getUserProfile(userId) {
    return userProfiles.find((profile) => profile.userId === userId) || null
  }
  
  export function getUserOrders(userId) {
    return orders.filter((order) => order.userId === userId)
  }
  
  export function getUserBookings(userId) {
    return courtBookings.filter((booking) => booking.userId === userId)
  }
  
  export function getUserCoachingSessions(userId) {
    return coachingSessions.filter((session) => session.userId === userId)
  }
  
  export function getUserRentals(userId) {
    return equipmentRentals.filter((rental) => rental.userId === userId)
  }
  
  export function getUserWishlist(userId) {
    const userWishlist = wishlist.find((list) => list.userId === userId)
    return userWishlist ? userWishlist.items : []
  }
  
  // Function to add item to wishlist
  export function addToWishlist(userId, productId) {
    const userWishlist = wishlist.find((list) => list.userId === userId)
  
    if (userWishlist) {
      // Check if product already exists in wishlist
      if (!userWishlist.items.some((item) => item.productId === productId)) {
        userWishlist.items.push({
          productId,
          dateAdded: new Date().toISOString().split("T")[0],
        })
      }
    } else {
      // Create new wishlist for user
      wishlist.push({
        userId,
        items: [
          {
            productId,
            dateAdded: new Date().toISOString().split("T")[0],
          },
        ],
      })
    }
  }
  
  // Function to remove item from wishlist
  export function removeFromWishlist(userId, productId) {
    const userWishlist = wishlist.find((list) => list.userId === userId)
  
    if (userWishlist) {
      userWishlist.items = userWishlist.items.filter((item) => item.productId !== productId)
      return true
    }
    return false
  }
  
  