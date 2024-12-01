/* eslint-disable react/prop-types */
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { useGetFlightDetailsQuery } from "../redux/features/flights/flightsApi";

const UserBookingCard = ({ booking }) => {
  const { flightId, numberOfSeats, status, totalPrice } = booking;
  const { data: flight, isLoading: flightLoading } =
    useGetFlightDetailsQuery(flightId);

  if (flightLoading)
    return <div className="text-center text-gray-600">Loading...</div>;

  const flightData = flight?.data || null;
  const { airline, flightNumber, origin, destination, date, time } =
    flightData || {};

  return (
    <div className="transition-all transform hover:scale-102 hover:shadow-2xl bg-white p-6 rounded-3xl shadow-xl mb-6 hover:bg-gray-50">
      <div className="flex flex-col space-y-6">
        {/* Header - Airline and Status */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{airline}</h3>
            <p className="text-sm text-gray-500">{flightNumber}</p>
          </div>
          {status === "confirmed" ? (
            <span className="bg-green-100 text-green-800 py-1 px-4 rounded-full text-sm font-medium">
              Confirmed
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 py-1 px-4 rounded-full text-sm font-medium">
              Pending
            </span>
          )}
        </div>

        {/* Flight Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 text-gray-600">
            <FaPlaneDeparture className="text-blue-500" />
            <span className="font-medium">Origin: {origin}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <FaPlaneArrival className="text-green-500" />
            <span className="font-medium">Destination: {destination}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaCalendarAlt className="text-orange-500" />
            <span className="font-medium">
              Date: {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaUsers className="text-blue-500" />
            <span className="font-medium">Seats: {numberOfSeats}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaDollarSign className="text-green-500" />
            <span className="font-medium">Total: ${totalPrice}</span>
          </div>
        </div>

        {/* Time with Icon */}
        <div className="flex items-center space-x-3 text-gray-600">
          <FaClock className="text-purple-500" />
          <span className="font-medium text-lg">
            Time: <strong className="text-black">{time}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserBookingCard;
