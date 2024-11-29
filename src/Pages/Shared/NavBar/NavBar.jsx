import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo (Text) */}
        <div className="flex items-center">
          <span className="text-2xl font-bold">FlightBook</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/flights" className="hover:text-gray-200">
            Flights
          </Link>
          <Link to="/bookings" className="hover:text-gray-200">
            My Bookings
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden absolute top-4 right-4 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full bg-blue-600 z-40`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block text-white hover:bg-blue-700 rounded-md px-4 py-2"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/flights"
            className="block text-white hover:bg-blue-700 rounded-md px-4 py-2"
            onClick={handleLinkClick}
          >
            Flights
          </Link>
          <Link
            to="/bookings"
            className="block text-white hover:bg-blue-700 rounded-md px-4 py-2"
            onClick={handleLinkClick}
          >
            My Bookings
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:bg-blue-700 rounded-md px-4 py-2"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
