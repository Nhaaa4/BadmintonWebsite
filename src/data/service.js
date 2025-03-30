import badmintonCoach from "../assets/badminton-coaching.jpg";
import badmintonCourt from "../assets/badminton-court.jpg";
import equipmentStringing from "../assets/equipment-stringing.jpg";
import juniorProgram from "../assets/junioir-program.png";

const services = [
  {
    id: 1,
    title: "Professional Coaching",
    description:
      "One-on-one or group coaching sessions with our certified professionals. Perfect for players of all skill levels looking to improve their technique and strategy.",
    img: badmintonCoach,
    price: 50,
    duration: "1 hour",
    availableTimes: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    coaches: ["Alex Johnson", "Samantha Lee", "David Chen"],
  },
  {
    id: 2,
    title: "Court Booking",
    description:
      "Reserve our professional-grade courts for your practice sessions or friendly matches. Flexible booking options available for single sessions or regular timeslots.",
    img: badmintonCourt,
    price: 25,
    duration: "1 hour",
    availableTimes: [
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
    ],
    courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"],
  },
  {
    id: 3,
    title: "Equipment Stringing",
    description:
      "Professional racket stringing service with a variety of string options. Our experts ensure the perfect tension for your playing style.",
    img: equipmentStringing,
    price: 20,
    duration: "Same day service",
    stringTypes: [
      "Yonex BG65",
      "Yonex BG80",
      "Li-Ning No.1",
      "Victor VS-850",
      "Ashaway Zymax",
    ],
  },
  {
    id: 4,
    title: "Junior Training Program",
    description:
      "Specialized training for young players aged 7-15. Develop fundamental skills, game awareness, and proper technique from an early age.",
    img: juniorProgram,
    price: 40,
    duration: "1 hour",
    ageGroups: ["7-9 years", "10-12 years", "13-15 years"],
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
];

const waitingList = [
  { id: 1, court: "Court 1", name: "Coppsary", timestamp: "10:15 AM" },
  { id: 2, court: "Court 2", name: "Badminton Stars", timestamp: "10:20 AM" },
  { id: 3, court: "Court 1", name: "YES stars", timestamp: "10:35 AM" },
  { id: 4, court: "Court 3", name: "Eagles Team", timestamp: "10:40 AM" },
  { id: 5, court: "Court 5", name: "CADT Team", timestamp: "1:40 AM" },
];

// Service bookings data
const serviceBookings = [
    {
      id: 1,
      userId: 1,
      serviceId: 1, // Professional Coaching
      coachId: "Alex Johnson",
      date: "2025-04-02",
      time: "17:30",
      duration: 1, // hours
      status: "Upcoming",
      price: 50.0,
      notes: "Focus on smash technique",
    },
    {
      id: 2,
      userId: 1,
      serviceId: 2, // Court Booking
      courtId: "Court 3",
      date: "2025-03-30",
      time: "18:00",
      duration: 2, // hours
      status: "Upcoming",
      price: 50.0,
      bookingType: "team",
      teamName: "Smash Masters",
      teamSize: 4,
      notes: "Bringing own equipment",
    },
    {
      id: 3,
      userId: 2,
      serviceId: 3, // Equipment Stringing
      date: "2025-03-25",
      stringType: "Yonex BG80",
      tension: "28 lbs",
      status: "Completed",
      price: 20.0,
      notes: "Racket model: Yonex Astrox 99",
    },
  ]
  
  // Export all data
  export { services, waitingList, serviceBookings }
  
  // Helper functions
  export function getServiceById(id) {
    return services.find((service) => service.id === Number(id)) || null
  }
  
  export function getWaitingListByCourt(courtId) {
    return waitingList.filter((item) => item.court === courtId)
  }
  
  export function getUserServiceBookings(userId) {
    return serviceBookings.filter((booking) => booking.userId === userId)
  }
  
  export function addToWaitingList(courtId, name) {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const timestamp = `${formattedHours}:${formattedMinutes} ${ampm}`
  
    const newItem = {
      id: waitingList.length + 1,
      court: courtId,
      name: name,
      timestamp: timestamp,
    }
  
    waitingList.push(newItem)
    return newItem
  }
  
  export function bookService(bookingData) {
    const newBooking = {
      id: serviceBookings.length + 1,
      ...bookingData,
      status: "Upcoming",
    }
  
    serviceBookings.push(newBooking)
    return newBooking
  }