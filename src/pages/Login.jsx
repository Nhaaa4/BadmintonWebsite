import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Circle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "../components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    // Try to login with provided credentials
    const success = login(formData.email, formData.password)
    
    setIsLoading(false)

    if (success) {
      // Show success toast
      toast({
        title: "Login Successful",
        description: "Welcome back! You've been logged in successfully.",
        variant: "default",
      })

      navigate("/profile")
    } else {
      // Show error toast
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }
  };

  return (
    <main className="min-h-screen bg-[#1e2535] py-16">
      <div className="max-w-md mx-auto bg-[#2c3b5a] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white block">
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
              className="bg-[#1e2535] border-gray-700 focus-visible:ring-yellow-400 w-full px-3 py-2 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-white block">
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
                className="bg-[#1e2535] border-gray-700 w-full px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-700 bg-[#1e2535]"
              />
              <label htmlFor="remember" className="text-white text-sm">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-yellow-400 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black h-10 px-4 py-2 rounded-md" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <Circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></Circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}