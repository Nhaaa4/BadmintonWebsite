/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useState} from "react"
import { Clock, MapPin, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "../components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import banner from "../assets/banner.jpg"
import { useAuth } from "@/context/AuthContext"
import { services, waitingList, addToWaitingList, bookService } from "@/data/service"

export default function Services() {
  const { user, isAuthenticated } = useAuth() 
  const [selectedService, setSelectedService] = useState(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingName, setBookingName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [selectedCourt, setSelectedCourt] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  // New state for waiting list functionality
  const [waitingListName, setWaitingListName] = useState("")
  const [waitingListTeamName, setWaitingListTeamName] = useState("")
  const [waitingListCourt, setWaitingListCourt] = useState("")
  const [waitingListDialogOpen, setWaitingListDialogOpen] = useState(false)

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setBookingName(user.name || "")
      setWaitingListName(user.name || "")
    }
  }, [isAuthenticated, user])

  const handleSelectService = (service) => {
    setSelectedService(service)
    setBookingSuccess(false)
    setBookingDialogOpen(true)
  }

  const handleBookService = () => {
    // Validate court booking specific fields
    if (selectedService?.id === 2) {
      if (!selectedCourt) {
        toast({
          title: "Missing Information",
          description: "Please select a court for your booking.",
          variant: "destructive",
        })
        return
      }

      if (!bookingName) {
        toast({
          title: "Missing Information",
          description: "Please enter your name for the booking.",
          variant: "destructive",
        })
        return
      }

      if (!teamName) {
        toast({
          title: "Missing Information",
          description: "Please enter your team name for the booking.",
          variant: "destructive",
        })
        return
      }
    }

    if (!bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your booking.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Create booking data
    const bookingData = {
      userId: isAuthenticated ? user.id : null,
      serviceId: selectedService.id,
      date: bookingDate,
      time: bookingTime,
      duration: 1, // Default to 1 hour
    }

    // Add service-specific data
    if (selectedService.id === 1) {
      // Coaching
      bookingData.coachId = document.getElementById("coach").value
    } else if (selectedService.id === 2) {
      // Court booking
      bookingData.courtId = selectedCourt
      bookingData.teamName = teamName
    }

    // Add notes if provided
    const notes = document.getElementById("notes")?.value
    if (notes) {
      bookingData.notes = notes
    }

    // Add price
    bookingData.price = selectedService.price

    // Simulate API call
    setTimeout(() => {
      // Save booking
      if (isAuthenticated) {
        bookService(bookingData)
      }

      setLoading(false)
      setBookingSuccess(true)

      let successMessage = `Your ${selectedService.title} has been booked for ${bookingDate} at ${bookingTime}.`

      if (selectedService?.id === 2) {
        successMessage = `Your ${selectedCourt} has been booked for ${bookingDate} at ${bookingTime} under team ${teamName}`
      }

      toast({
        title: "Booking Confirmed",
        description: successMessage,
      })
    }, 1500)
  }

  const handleViewServiceDetails = (service) => {
    setSelectedService(service)
    setViewDetailsOpen(true)
  }

  // New function to handle joining the waiting list
  const handleJoinWaitingList = () => {
    if (!waitingListCourt) {
      toast({
        title: "Missing Information",
        description: "Please select a court for the waiting list.",
        variant: "destructive",
      })
      return
    }

    if (!waitingListTeamName) {
      toast({
        title: "Missing Information",
        description: "Please enter your team name to join the waiting list.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      addToWaitingList(waitingListCourt, waitingListTeamName)
      
      setLoading(false)
      setWaitingListDialogOpen(false)

      toast({
        title: "Added to Waiting List",
        description: `You've been added to the waiting list for ${waitingListCourt}.`,
      })

      // Reset form fields
      setWaitingListName("")
      setWaitingListTeamName("")
      setWaitingListCourt("")
    }, 1500)
  }

  // Group waiting list by court
  const waitingListByCourt = services[1].courts.reduce((acc, court) => {
    acc[court] = waitingList.filter((item) => item.court === court)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-[#1e2535] pb-16">
      <motion.div
        className="relative h-[300px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={banner} alt="Services" fill className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Our Services</h1>
        </div>
      </motion.div>

      <section className="py-12 px-6 md:px-16">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white text-lg">
            At Fair Play, we offer a comprehensive range of services designed to help players at all levels improve
            their game and enjoy the sport. From professional coaching to equipment maintenance, we've got you covered.
          </p>
        </motion.div>

        {/* Court Waiting List Section */}
        <motion.div
          className="mb-12 bg-[#2c3b5a] rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Court Waiting List</h2>
              <p className="text-gray-300">Join the waiting list if all courts are currently occupied.</p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black mt-4 md:mt-0"
              onClick={() => setWaitingListDialogOpen(true)}
            >
              Join Waiting List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services[1].courts.map((court) => (
              <div key={court} className="bg-[#1e2535] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex justify-between">
                  <span>{court}</span>
                  <span className="text-sm bg-[#3b4d71] px-2 py-1 rounded text-gray-300">
                    {waitingListByCourt[court]?.length || 0} waiting
                  </span>
                </h3>

                {waitingListByCourt[court]?.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {waitingListByCourt[court].map((item, index) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
                      >
                        <div>
                          <span className="text-gray-400 mr-2">{index + 1}.</span>
                          <span className="text-white">{item.name}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{item.timestamp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">No one waiting</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <h2
                  className="text-2xl font-bold text-yellow-400 mb-4 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => handleViewServiceDetails(service)}
                >
                  {service.title}
                </h2>
                <p className="text-white mb-4">{service.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                    {service.duration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 text-yellow-400 mr-2" />
                    Fair Play Center
                  </div>
                  <div className="flex items-center text-yellow-400 font-bold">${service.price}/session</div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() => handleSelectService(service)}
                  >
                    Book Now
                  </button>

                  <button
                    variant="outline"
                    className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 px-4 py-2 border-gray-700 text-white hover:bg-[#3b4d71]"
                    onClick={() => handleViewServiceDetails(service)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <motion.div
                className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleViewServiceDetails(service)}
                >
                  <img src={service.img} alt={service.title} fill className="object-cover" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">{selectedService?.title}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Complete the form below to book your session.
            </DialogDescription>
          </DialogHeader>

          {bookingSuccess ? (
            <div className="py-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-gray-300 mb-4">
                {selectedService?.id === 2 ? (
                  <>
                    Your {selectedCourt} has been booked for {bookingDate} at {bookingTime} under{" "}
                    team {`"${teamName}"`}.
                  </>
                ) : (
                  <>
                    Your {selectedService?.title} has been booked for {bookingDate} at {bookingTime}.
                  </>
                )}
              </p>
              <p className="text-gray-300">A confirmation email has been sent to your registered email address.</p>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="booking-date" className="text-right">
                  Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {(selectedService?.id === 1 || selectedService?.id === 2) && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="booking-time" className="text-right">
                    Time
                  </label>
                  <Select onValueChange={setBookingTime}>
                    <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                      {selectedService?.availableTimes?.map((time) => (
                        <SelectItem key={time} value={time} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedService?.id === 1 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="coach" className="text-right">
                    Coach
                  </label>
                  <Select>
                    <SelectTrigger id="coach" className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                      <SelectValue placeholder="Select a coach" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                      {selectedService.coaches.map((coach) => (
                        <SelectItem key={coach} value={coach} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                          {coach}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedService?.id === 2 && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="court" className="text-right">
                      Court
                    </label>
                    <Select onValueChange={setSelectedCourt}>
                      <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                        <SelectValue placeholder="Select a court" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                        {selectedService.courts.map((court) => (
                          <SelectItem key={court} value={court} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                            {court}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="team-name" className="text-right">
                      Team Name
                    </label>
                    <input
                      id="team-name"
                      placeholder="Enter your team name"
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right">
                  Notes
                </label>
                <input
                  id="notes"
                  placeholder="Any special requests or requirements"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {!bookingSuccess && (
              <button
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={handleBookService}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-2xl">{selectedService?.title}</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img
                src={selectedService?.img || "/placeholder.svg"}
                alt={selectedService?.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-white mb-4">{selectedService?.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                  Duration: {selectedService?.duration}
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 text-yellow-400 mr-2" />
                  Location: Fair Play Center
                </div>
                <div className="flex items-center text-yellow-400 font-bold">
                  Price: ${selectedService?.price}/session
                </div>
              </div>
            </div>
          </div>

          {selectedService?.id === 1 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Available Coaches</h3>
              <div className="grid grid-cols-3 gap-4">
                {selectedService.coaches.map((coach) => (
                  <div key={coach} className="bg-[#1e2535] p-3 rounded-lg text-center">
                    {coach}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedService?.id === 2 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Court Information</h3>
              <p className="text-gray-300 mb-4">
                Our professional-grade courts are maintained to international standards, providing the perfect surface
                for both casual and competitive play. Each court features:
              </p>
              <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                <li>Professional-grade flooring with proper shock absorption</li>
                <li>Excellent lighting designed to eliminate shadows</li>
                <li>Proper line markings according to BWF standards</li>
                <li>Adequate space between courts for safety</li>
                <li>Digital scoreboard for each court</li>
              </ul>
              <p className="text-gray-300">
                Courts can be booked for individual practice, friendly matches, or team training sessions.
              </p>
            </div>
          )}

          {selectedService?.id === 3 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Available String Types</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedService.stringTypes.map((type) => (
                  <div key={type} className="bg-[#1e2535] p-3 rounded-lg">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedService?.id === 4 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Program Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Age Groups</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    {selectedService.ageGroups.map((group) => (
                      <li key={group}>{group}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Skill Levels</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    {selectedService.levels.map((level) => (
                      <li key={level}>{level}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => {
                setViewDetailsOpen(false)
                handleSelectService(selectedService)
              }}
            >
              Book This Service
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Waiting List Dialog */}
      <Dialog open={waitingListDialogOpen} onOpenChange={setWaitingListDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Join Court Waiting List</DialogTitle>
            <DialogDescription className="text-gray-300">
              Add your name to the waiting list for a court. Our staff will notify you when a court becomes available.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="grid grid-cols-2 items-center gap-4 mb-8">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="waiting-court" className="text-right">
                  Court
                </label>
                <Select onValueChange={setWaitingListCourt}>
                  <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                    <SelectValue placeholder="Select a court" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                    {services[1].courts.map((court) => (
                      <SelectItem key={court} value={court} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        {court}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
                  
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="waiting-team-name" className="text-right">
                  Team Name
                </label>
                <input
                  id="waiting-team-name"
                  placeholder="Enter your team name"
                  className="flex h-10 w-full col-span-3 rounded-md border px-3 py-2 text-sm bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400"
                  value={waitingListTeamName}
                  onChange={(e) => setWaitingListTeamName(e.target.value)}
                  />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="waiting-notes" className="text-right">
                  Notes
                </label>
                <input
                  id="waiting-notes"
                  placeholder="Any special requests or preferences"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400"
                  />
              </div>
            </div>

            <div className="col-span-4 bg-[#1e2535] p-3 rounded-lg mt-2">
              <p className="text-sm text-gray-300">
                <span className="text-yellow-400 font-bold">Note:</span> Only staff members can remove you from the
                waiting list. Please check in at the front desk when you arrive.
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={handleJoinWaitingList}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                  Processing...
                </span>
              ) : (
                "Join Waiting List"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

