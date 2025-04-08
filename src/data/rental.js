import racket from "../assets/premuim-racket.png"
import shoes from "../assets/shoes.png"
import clothes from "../assets/clothes.png"
import shuttlecock from "../assets/shuttlecock.png"

// Rental items
const rentalItems = [
  {
    id: 1,
    name: "Premium Racket",
    description: "High-quality rackets for players of all levels",
    price: 10,
    image: racket,
    details: {
      brand: "Yonex",
      model: "Astrox 99",
      weight: "85g",
      balance: "Head-heavy",
      flexibility: "Stiff",
      availableUnits: 15,
    },
  },
  {
    id: 2,
    name: "Court Shoes",
    description: "Non-marking shoes with excellent grip and support",
    price: 8,
    image: shoes,
    details: {
      brand: "Victor",
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: "White/Blue",
      type: "Indoor Court",
      availableUnits: 20,
    },
  },
  {
    id: 3,
    name: "Performance Wear",
    description: "Comfortable sportswear for optimal movement",
    price: 12,
    image: clothes,
    details: {
      type: "Shirt & Shorts Set",
      sizes: ["S", "M", "L", "XL"],
      material: "Breathable Polyester",
      color: "Multiple options",
      availableUnits: 25,
    },
  },
  {
    id: 4,
    name: "Shuttlecocks",
    description: "Tournament grade feather or synthetic shuttles",
    price: 5,
    image: shuttlecock,
    details: {
      type: "Feather",
      quantity: "Tube of 12",
      speed: "Medium",
      grade: "Tournament",
      availableUnits: 50,
    },
  },
]

// Rental packages
const rentalPackages = [
  {
    id: 1,
    name: "Basic",
    price: 20,
    duration: "1 hour",
    features: ["1 Court", "2 Rackets", "5 Shuttlecocks"],
  },
  {
    id: 2,
    name: "Standard",
    price: 35,
    duration: "2 hours",
    features: ["1 Court", "4 Rackets", "10 Shuttlecocks", "Shoes Rental", "Locker Access"],
    popular: true,
  },
  {
    id: 3,
    name: "Pro",
    price: 60,
    duration: "3 hours",
    features: [
      "1 Court",
      "4 Premium Rackets",
      "Unlimited Shuttlecocks",
      "Shoes Rental",
      "Performance Wear",
      "Locker Access",
      "Refreshments",
    ],
  },
]

// Rental history
const rentalHistory = [
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
  {
    id: 3,
    userId: 2,
    date: "2025-03-20",
    packageId: 2, // Standard package
    duration: 2, // hours
    total: 35.0,
    status: "Completed",
    deposit: 100.0,
    depositReturned: true,
    notes: "Team practice session",
  },
]

// Export all data
export { rentalItems, rentalPackages, rentalHistory }

// Helper functions
export function getRentalItemById(id) {
  return rentalItems.find((item) => item.id === Number(id)) || null
}

export function getRentalPackageById(id) {
  return rentalPackages.find((pkg) => pkg.id === Number(id)) || null
}

export function getUserRentalHistory(userId) {
  return rentalHistory.filter((rental) => rental.userId === userId)
}

export function createRental(rentalData) {
  const newRental = {
    id: rentalHistory.length + 1,
    ...rentalData,
    status: "Upcoming",
  }

  rentalHistory.push(newRental)
  return newRental
}

