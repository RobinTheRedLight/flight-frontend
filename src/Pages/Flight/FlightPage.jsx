import { useParams } from "react-router-dom";
import { useGetFlightDetailsQuery } from "../../redux/features/flights/flightsApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUserFriends,
  FaSuitcase,
  FaClipboardCheck,
} from "react-icons/fa";
import { useCreateBookingMutation } from "../../redux/features/bookings/bookingsApi";

const FlightPage = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetFlightDetailsQuery(id);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [createBooking] = useCreateBookingMutation();

  if (isLoading) return <div>Loading...</div>;

  const flight = data?.data || null;
  if (!flight) return <div>Flight not found</div>;

  const handleBookingSubmit = async () => {
    const bookingData = {
      userId: user._id,
      flightId: flight._id,
      numberOfSeats: Number(numberOfSeats),
    };
    console.log(bookingData);

    try {
      await createBooking(bookingData);
      setOpenModal(false); // Close modal on success
      alert("Booking created successfully!");
      // Optionally navigate to another page, like user bookings page
      // navigate('/user-bookings');
    } catch (error) {
      console.error("Booking failed", error);
      alert("There was an error with your booking.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Left Side: Flight Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col space-y-6">
            {/* Flight Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {flight.airline} - {flight.flightNumber}
            </h1>

            {/* Flight Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <FaPlaneDeparture className="text-4xl text-blue-500" />
                <div>
                  <p className="font-medium text-gray-600">Origin</p>
                  <p className="text-lg text-gray-800">{flight.origin}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaPlaneArrival className="text-4xl text-green-600" />
                <div>
                  <p className="font-medium text-gray-600">Destination</p>
                  <p className="text-lg text-gray-800">{flight.destination}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-4xl text-orange-600" />
                <div>
                  <p className="font-medium text-gray-600">Date</p>
                  <p className="text-lg text-gray-800">
                    {new Date(flight.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaClock className="text-4xl text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-600">Time</p>
                  <p className="text-lg text-gray-800">{flight.time}</p>
                </div>
              </div>
            </div>

            {/* Price & Available Seats */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <FaDollarSign className="text-3xl text-green-600" />
                  <div>
                    <p className="font-medium text-gray-600">Price</p>
                    <p className="text-xl text-gray-800">${flight.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaUserFriends className="text-3xl text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-600">Available Seats</p>
                    <p className="text-xl text-gray-800">
                      {flight.availableSeats}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setOpenModal(true)}
                className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transform transition duration-300 hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Baggage and Flight Policies */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <FaSuitcase className="text-blue-500" />
              <span>Baggage Info</span>
            </h3>
            <div className="text-gray-600 text-sm mt-2">
              <p>
                <strong>Carry-on:</strong> 1 free cabin bag (max 7 kg).
              </p>
              <p>
                <strong>Checked:</strong> 1 checked bag (max 20 kg) included.
              </p>
              <p>
                <strong>Additional:</strong> $50 for an extra checked bag (max
                23 kg).
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <FaClipboardCheck className="text-purple-600" />
              <span>Flight Policies</span>
            </h3>
            <div className="text-gray-600 text-sm mt-2">
              <p>
                <strong>Cancellation:</strong> Free cancellation within 24 hours
                of booking.
              </p>
              <p>
                <strong>Changes:</strong> $50 fee for any changes after 24
                hours.
              </p>
              <p>
                <strong>Priority Boarding:</strong> $20 for priority boarding at
                the gate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Booking Information
            </h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  value={user.phone || "Not Provided"}
                  readOnly
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* Address Input */}
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  value={user.address || "Not Provided"}
                  readOnly
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* Number of Seats Input */}
              <div>
                <label className="block text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  value={numberOfSeats}
                  min="1"
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={handleBookingSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPage;
