import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "../components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleNextStep = (e) => {
    e.preventDefault()

    // Validate first step
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate password (simple validation for demo)
    if (formData.password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Prepare user data
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`, // Add this line to explicitly set the name
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    }

    // Try to register
    const success = register(userData)

    setIsLoading(false)

    if (success) {
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
        variant: "default",
      })

      // Redirect to profile page
      navigate("/profile")
    } else {
      // Show error toast
      toast({
        title: "Registration Failed",
        description: "This email is already registered. Please use a different email.",
        variant: "destructive",
      })

      // Go back to first step
      setStep(1)
    }
  }

  return (
    <main className="min-h-screen bg-[#1e2535] py-16">
      <div className="max-w-md mx-auto bg-[#2c3b5a] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Create Account</h1>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-yellow-400" : "bg-gray-600"}`}></div>
          <div className={`w-8 h-1 ${step >= 1 ? "bg-gray-600" : "bg-gray-800"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-yellow-400" : "bg-gray-600"}`}></div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
                  className="bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400 w-full px-3 py-2 rounded pr-10"
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
                  className="bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400 w-full px-3 py-2 rounded pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400 w-full px-3 py-2 rounded pr-10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400 w-full px-3 py-2 rounded pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 8 characters long and include a number and special character.
              </p>
            </div>

            <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black h-10 rounded-md">
              Continue
            </button>

            <div className="mt-6 text-center">
              <p className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-400 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-white">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(885) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-white">
                Address
              </label>
              <input
                id="address"
                name="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
                className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-white">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  placeholder="Phnom Penh"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-white">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  placeholder="PP"
                  value={formData.state}
                  onChange={handleChange}
                  className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="zip" className="text-white">
                ZIP Code
              </label>
              <input
                id="zip"
                name="zip"
                placeholder="10001"
                value={formData.zip}
                onChange={handleChange}
                className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 h-4 w-4"
              />
              <label htmlFor="terms" className="text-white text-sm">
                I agree to the{" "}
                <Link href="#" className="text-yellow-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-yellow-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                variant="outline"
                className="flex-1 border border-white text-white rounded-md hover:bg-[#3b4d71]"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 bg-yellow-400 text-black h-10 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}