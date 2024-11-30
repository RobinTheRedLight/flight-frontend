/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaPlane, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const FlightCard = ({ flight }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-103">
      <div className="flex flex-col space-y-6">
        {/* Airline and Flight Number */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">{flight.airline}</h3>
          <span className="text-xl text-gray-500">{flight.flightNumber}</span>
        </div>

        {/* Flight Origin and Destination */}
        <div className="text-lg text-gray-700">
          <p>
            <strong className="font-medium">Origin:</strong> {flight.origin}{" "}
            <br />
            <strong className="font-medium">Destination:</strong>{" "}
            {flight.destination}
          </p>
        </div>

        {/* Date, Time, Price */}
        <div className="flex justify-between text-gray-600">
          <p className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>{new Date(flight.date).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center space-x-2">
            <FaPlane className="text-gray-500" />
            <span>{flight.time}</span>
          </p>
          <p className="text-lg font-semibold">${flight.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          {/* View Details Button */}
          <Link
            to={`/flight/${flight._id}`}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
          >
            <span>View Details</span>
            <FaArrowRight className="ml-2" />
          </Link>

          {/* Book Now Button */}
          <button className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition-all duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
