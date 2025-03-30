import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-yellow-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}