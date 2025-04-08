import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed successfully with email: ${email}`);
      setEmail(""); // Clear the input field after subscribing
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-yellow-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-4">
              {/* <img src="/images/logo.png" alt="Fair Play Logo" width={40} height={40} className="mr-2" /> */}
              <span className="text-[#1e2535] font-bold text-xl">Fair Play</span>
            </div>
            <p className="text-[#1e2535] mb-4">
              Providing high-quality badminton equipment and facilities since 2008. Our mission is to promote fair play
              and help players of all levels improve their game.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61567582710788" target="_blank" className="text-[#1e2535] hover:text-white transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://www.instagram.com/coppsary/" target="_blank" className="text-[#1e2535] hover:text-white transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.tiktok.com/@coppsary" target="_blank" className="text-[#1e2535] hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </a>
              <a href="https://www.youtube.com/@coppsary" target="_blank" className="text-[#1e2535] hover:text-white transition-colors">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#1e2535] font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-[#1e2535] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-[#1e2535] hover:text-white transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#1e2535] hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/rental" className="text-[#1e2535] hover:text-white transition-colors">
                  Rental
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#1e2535] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[#1e2535] hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#1e2535] font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-[#1e2535] mr-2 h-5 w-5 mt-0.5" />
                <span className="text-[#1e2535]">
                  123 Badminton Court, Sports Avenue
                  <br />
                  Phnom Penh, Cambodia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-[#1e2535] mr-2 h-5 w-5" />
                <span className="text-[#1e2535]">(+855) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-[#1e2535] mr-2 h-5 w-5" />
                <span className="text-[#1e2535]">info@fairplay.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-[#1e2535] mr-2 h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-[#1e2535]">Mon-Fri: 7:00 AM - 10:00 PM</p>
                  <p className="text-[#1e2535]">Sat-Sun: 8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#1e2535] font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-[#1e2535] mb-4">
              Subscribe to our newsletter to receive updates on new products, special offers, and badminton tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none bg-white border text-black border-gray-300 focus:ring-[#1e2535] focus:ring-2 p-2 rounded-2xl"
              />
              <button
                onClick={handleSubscribe}
                className="bg-[#1e2535] hover:bg-[#2c3b5a] text-white rounded-2xl px-4 py-2"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e2535]/20 mt-8 pt-8 text-center">
          <p className="text-[#1e2535]">&copy; {new Date().getFullYear()} Fair Play Badminton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}