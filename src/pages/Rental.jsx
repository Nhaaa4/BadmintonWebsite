/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { CheckCircle, Info } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import badmintonRacket from "../assets/badminton-racket.png"
import { useAuth } from "@/context/AuthContext"
import { rentalItems, rentalPackages, createRental } from "@/data/rental"

export default function Rental() {
  const { user, isAuthenticated } = useAuth()
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [rentalDate, setRentalDate] = useState("")
  const [rentalTime, setRentalTime] = useState("")
  const [rentalDuration, setRentalDuration] = useState("1")
  const [rentalSuccess, setRentalSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [rentDialogOpen, setRentDialogOpen] = useState(false)
  const [packageDetailsDialogOpen, setPackageDetailsDialogOpen] = useState(false)
  const [packageBookDialogOpen, setPackageBookDialogOpen] = useState(false)

  const handleSelectItem = (item) => {
    setSelectedItem(item)
    setRentalSuccess(false)
    setRentDialogOpen(true)
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg)
    setRentalSuccess(false)
    setPackageBookDialogOpen(true)
  }

  const handleRentItem = () => {
    // Create rental data
    const rentalData = {
      userId: isAuthenticated ? user.id : null,
      date: rentalDate,
      time: rentalTime,
      duration: rentalDuration === "day" ? 8 : Number(rentalDuration), // Convert to hours
    }

    // Add item-specific or package-specific data
    if (selectedItem) {
      // For individual item rental
      const quantity = document.getElementById("quantity")?.value || "1"
      const size = selectedItem.id === 2 ? document.getElementById("shoe-size")?.value : null

      rentalData.items = [
        {
          itemId: selectedItem.id,
          name: selectedItem.name,
          quantity: Number(quantity),
          price: selectedItem.price,
          size: size,
        },
      ]

      rentalData.total = selectedItem.price * Number(quantity) * Number(rentalDuration)
      rentalData.deposit = 50.0 // Standard deposit for items
    } else if (selectedPackage) {
      // For package rental
      rentalData.packageId = selectedPackage.id
      rentalData.total = selectedPackage.price
      rentalData.deposit = 100.0 // Higher deposit for packages

      // Add player info for packages
      const players = document.getElementById("players")?.value || "2"
      rentalData.players = Number(players)
    }

    // Add notes if provided
    const notes = document.getElementById("notes")?.value
    if (notes) {
      rentalData.notes = notes
    }

    // Simulate API call
    setTimeout(() => {
      // Save rental if authenticated
      if (isAuthenticated) {
        createRental(rentalData)
      }

      setLoading(false)
      setRentalSuccess(true)

      toast({
        title: "Rental Confirmed",
        description: `Your ${selectedItem ? selectedItem.name : selectedPackage.name + " Package"} has been reserved for ${rentalDate} at ${rentalTime}.`,
      })
    }, 1500)
  }

  const handleViewItemDetails = (item) => {
    setSelectedItem(item)
    setDetailsDialogOpen(true)
  }

  const handleViewPackageDetails = (pkg) => {
    setSelectedPackage(pkg)
    setPackageDetailsDialogOpen(true)
  }

  const availableTimes = [
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
  ]

  return (
    <main className="min-h-screen bg-[#1e2535] pb-16">
      <section className="py-12 px-6 md:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-4xl font-bold text-yellow-400 mb-8">Equipment Rental</h1>

          <Tabs defaultValue="items" className="mb-12">
            <TabsList className="bg-[#2c3b5a] text-white border-b border-gray-700 rounded-t-lg mb-6">
              <TabsTrigger
                value="items"
                className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
              >
                Individual Items
              </TabsTrigger>
              <TabsTrigger
                value="packages"
                className="data-[state=active]:bg-[#3b4d71] data-[state=active]:text-yellow-400"
              >
                Rental Packages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rentalItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="border border-gray-700 rounded-lg p-4 bg-[#2c3b5a] hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleViewItemDetails(item)}
                  >
                    <div className="mb-4 flex justify-center">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} width={120} height={150} />
                    </div>
                    <div className="text-white text-lg font-semibold mb-1 hover:text-yellow-400 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-300 mb-3">{item.description}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-yellow-400 font-bold">${item.price}/hr</div>
                      <div className="flex gap-2">
                        <button
                          variant="outline"
                          size="sm"
                          className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 px-4 py-2 border-white/20 text-white hover:bg-[#3b4d71]"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewItemDetails(item)
                          }}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Details
                        </button>

                        <button
                          className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectItem(item)
                          }}
                        >
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="packages">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rentalPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    className={`border rounded-lg p-6 cursor-pointer ${
                      pkg.popular ? "border-yellow-400 bg-[#2c3b5a]" : "border-gray-700 bg-[#1e2535]"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleViewPackageDetails(pkg)}
                  >
                    {pkg.popular && (
                      <div className="bg-yellow-400 text-black text-sm font-semibold py-1 px-3 rounded-full w-fit mb-4">
                        Most Popular
                      </div>
                    )}
                    <div className="text-white text-xl font-bold mb-2 hover:text-yellow-400 transition-colors">
                      {pkg.name} Package
                    </div>
                    <div className="text-yellow-400 text-3xl font-bold mb-1">${pkg.price}</div>
                    <div className="text-gray-400 mb-6">for {pkg.duration}</div>

                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        variant="outline"
                        className={`${
                          pkg.popular
                            ? "flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 px-4 py-2 border-white/20 text-white hover:bg-[#3b4d71]"
                            : "flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border h-10 px-4 py-2 border-gray-700 text-white hover:bg-[#2c3b5a]"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewPackageDetails(pkg)
                        }}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Details
                      </button>

                      <button
                        className={`flex-1 ${
                          pkg.popular
                            ? "flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
                            : "flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 flex-1 bg-[#3b4d71] hover:bg-[#2c3b5a] text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectPackage(pkg)
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Item Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">{selectedItem?.name}</DialogTitle>
            <DialogDescription className="text-gray-300">Rental equipment details</DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="relative h-full rounded-lg overflow-hidden">
              <img
                src={selectedItem?.image || "/placeholder.svg"}
                alt={selectedItem?.name}
                fill
                className="object-contain"
              />
            </div>

            <div>
              <p className="text-white mb-4">{selectedItem?.description}</p>

              <div className="text-yellow-400 font-bold mb-2">${selectedItem?.price}/hr</div>

              <div className="space-y-1 text-sm">
                {selectedItem?.details &&
                  Object.entries(selectedItem.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="text-gray-400 capitalize w-1/3">{key}:</span>
                      <span className="text-white">{Array.isArray(value) ? value.join(", ") : value.toString()}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              className="rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => {
                setDetailsDialogOpen(false)
                handleSelectItem(selectedItem)
              }}
            >
              Rent Now
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rent Item Dialog */}
      <Dialog open={rentDialogOpen} onOpenChange={setRentDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Rent {selectedItem?.name}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Complete the form below to rent this equipment.
            </DialogDescription>
          </DialogHeader>

          {rentalSuccess ? (
            <div className="py-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Rental Confirmed!</h3>
              <p className="text-gray-300 mb-4">
                Your {selectedItem?.name} has been reserved for {rentalDate} at {rentalTime} for {rentalDuration}{" "}
                hour(s).
              </p>
              <p className="text-gray-300">
                Please pick up your equipment at the rental counter 15 minutes before your start time.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="rental-date" className="text-right">
                    Date
                  </label>
                  <input
                    id="rental-date"
                    type="date"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="rental-time" className="text-right">
                    Time
                  </label>
                  <Select onValueChange={setRentalTime}>
                    <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="rental-duration" className="text-right">
                    Duration
                  </label>
                  <Select defaultValue="1" onValueChange={setRentalDuration}>
                    <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                      <SelectItem value="1" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        1 hour
                      </SelectItem>
                      <SelectItem value="2" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        2 hours
                      </SelectItem>
                      <SelectItem value="3" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        3 hours
                      </SelectItem>
                      <SelectItem value="4" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        4 hours
                      </SelectItem>
                      <SelectItem value="day" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        Full day
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedItem?.id === 2 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="shoe-size" className="text-right">
                      Shoe Size
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                        {selectedItem.details.sizes.map((size) => (
                          <SelectItem key={size} value={size} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedItem?.id === 3 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="clothing-size" className="text-right">
                      Size
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                        {selectedItem.details.sizes.map((size) => (
                          <SelectItem key={size} value={size} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="quantity" className="text-right">
                    Quantity
                  </label>
                  <Select defaultValue="1">
                    <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className=" pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Rental Fee:</span>
                  <span className="text-white">${selectedItem?.price}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Security Deposit:</span>
                  <span className="text-white">$50.00 (refundable)</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {!rentalSuccess && (
              <button
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={handleRentItem}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  "Confirm Rental"
                )}
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Package Details Dialog */}
      <Dialog open={packageDetailsDialogOpen} onOpenChange={setPackageDetailsDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">{selectedPackage?.name} Package</DialogTitle>
            <DialogDescription className="text-gray-300">Package details and included items</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-yellow-400 text-2xl font-bold">${selectedPackage?.price}</div>
                <div className="text-gray-400">for {selectedPackage?.duration}</div>
              </div>
              {selectedPackage?.popular && (
                <div className="bg-yellow-400 text-black text-sm font-semibold py-1 px-3 rounded-full h-fit">
                  Most Popular
                </div>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Included in this package:</h3>
              <div className="space-y-3">
                {selectedPackage?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-white mb-3">Package Benefits:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Save up to 20% compared to renting items individually</li>
                <li>Priority court booking</li>
                <li>Free equipment setup and adjustment</li>
                <li>Dedicated staff assistance</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <button
              className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => {
                setPackageDetailsDialogOpen(false)
                handleSelectPackage(selectedPackage)
              }}
            >
              Book This Package
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Book Package Dialog */}
      <Dialog open={packageBookDialogOpen} onOpenChange={setPackageBookDialogOpen}>
        <DialogContent className="bg-[#2c3b5a] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Book {selectedPackage?.name} Package</DialogTitle>
            <DialogDescription className="text-gray-300">
              Complete the form below to book this package.
            </DialogDescription>
          </DialogHeader>

          {rentalSuccess ? (
            <div className="py-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-gray-300 mb-4">
                Your {selectedPackage?.name} Package has been reserved for {rentalDate} at {rentalTime}.
              </p>
              <p className="text-gray-300">Please arrive 15 minutes before your start time to complete check-in.</p>
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
                  value={rentalDate}
                  onChange={(e) => setRentalDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="booking-time" className="text-right">
                  Time
                </label>
                <Select onValueChange={setRentalTime}>
                  <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time} className="focus:bg-[#3b4d71] focus:text-yellow-400">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="players" className="text-right">
                  Players
                </label>
                <Select defaultValue="2">
                  <SelectTrigger className="col-span-3 bg-[#1e2535] border-gray-700 focus:ring-yellow-400 text-white">
                    <SelectValue placeholder="Number of players" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2c3b5a] border-gray-700 text-white">
                    <SelectItem value="2" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                      2 players
                    </SelectItem>
                    <SelectItem value="4" className="focus:bg-[#3b4d71] focus:text-yellow-400">
                      4 players
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right">
                  Special Requests
                </label>
                <input
                  id="notes"
                  placeholder="Any special requirements or preferences"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm col-span-3 bg-[#1e2535] border-gray-700"
                />
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Package Fee:</span>
                  <span className="text-white">${selectedPackage?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Security Deposit:</span>
                  <span className="text-white">$100.00 (refundable)</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {!rentalSuccess && (
              <button
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={handleRentItem}
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
    </main>
  )
}

