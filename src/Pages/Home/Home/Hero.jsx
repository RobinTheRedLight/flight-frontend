import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { origin, destination, date } = searchCriteria;
    const searchParams = new URLSearchParams();
    if (origin) searchParams.append("origin", origin);
    if (destination) searchParams.append("destination", destination);
    if (date) searchParams.append("date", date);

    navigate(`/flights?${searchParams.toString()}`);
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen md:h-[60vh]"
      style={{ backgroundImage: "url('./src/assets/Home/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-center text-white relative z-10 p-8 h-full flex justify-center items-center ">
        <div>
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to FlightBooking
          </h1>
          <p className="text-lg mb-8">
            Search and book your next flight with ease. Find available flights
            based on your preferences.
          </p>

          {/* Search Bar */}
          <div className="mb-8 flex flex-col sm:flex-row sm:gap-4 sm:items-center sm:justify-center">
            <input
              type="text"
              name="origin"
              placeholder="Enter origin city"
              className="border p-3 rounded-lg w-full sm:w-64 text-gray-800 placeholder-gray-500 mb-4 sm:mb-0"
              value={searchCriteria.origin}
              onChange={handleChange}
            />
            <input
              type="text"
              name="destination"
              placeholder="Enter destination city"
              className="border p-3 rounded-lg w-full sm:w-64 text-gray-800 placeholder-gray-500 mb-4 sm:mb-0"
              value={searchCriteria.destination}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              className="border p-3 rounded-lg w-full sm:w-48 text-gray-800 mb-4 sm:mb-0"
              value={searchCriteria.date}
              onChange={handleChange}
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-blue-500 text-white rounded-lg mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center w-full sm:w-auto"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
