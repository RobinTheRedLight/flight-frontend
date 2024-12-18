import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { useState } from "react";
import { useUpdateBookingMutation } from "../redux/features/bookings/bookingsApi";
import { useGetFlightDetailsQuery } from "../redux/features/flights/flightsApi";
import Swal from "sweetalert2";
import PostLoading from "./PostLoading";

/* eslint-disable react/prop-types */
const BookingCard = ({ booking }) => {
  const { _id, flightId, numberOfSeats, status, totalPrice } = booking;
  const { data: flight, isLoading: flightLoading } =
    useGetFlightDetailsQuery(flightId);
  const [updateBooking] = useUpdateBookingMutation();
  const [loading, setLoading] = useState(false);

  if (flightLoading) return <PostLoading></PostLoading>;

  const flightData = flight?.data || null;

  const { airline, flightNumber, origin, destination, date, time } = flightData;

  const handleUpdateBooking = async (newStatus) => {
    setLoading(true);
    try {
      const updatedData = { status: newStatus };
      await updateBooking({ id: _id, updatedData });
      Swal.fire({
        title: "Success",
        text: `Booking status updated to ${newStatus}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an issue updating the booking.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-103">
      <div className="space-y-4">
        {/* Header: Airline Name and Status */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{airline}</h2>
          {/* Show Pending only if status is not confirmed */}
          {status !== "confirmed" && (
            <span className="text-lg font-semibold text-yellow-500">
              Pending
            </span>
          )}
        </div>

        {/* Flight Number - now placed under the airline name */}
        <div className="text-gray-600 text-lg font-medium">{flightNumber}</div>

        {/* Flight & User Info */}
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center space-x-2">
            <FaPlaneDeparture className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="font-medium">Origin:</strong> {origin}{" "}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPlaneArrival className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="font-medium">Destination:</strong>{" "}
              {destination}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="font-medium">Date:</strong>{" "}
              {new Date(date).toLocaleDateString()} at {time}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUsers className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="font-medium">Seats:</strong> {numberOfSeats}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaDollarSign className="w-5 h-5 text-gray-500" />
            <span>
              <strong className="font-medium">Total Price:</strong> $
              {totalPrice}
            </span>
          </div>
        </div>

        {/* Admin Action: Confirm Booking */}
        <div className="mt-6 flex justify-center">
          {/* Show Confirm Button if the booking is not confirmed */}
          {status !== "confirmed" && (
            <button
              onClick={() => handleUpdateBooking("confirmed")}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Confirming..." : "Confirm Booking"}
            </button>
          )}

          {/* Message when booking is already confirmed */}
          {status === "confirmed" && (
            <div className="text-lg font-semibold text-green-600 mt-4">
              Booking Confirmed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
