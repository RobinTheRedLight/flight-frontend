/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
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
import BookModal from "../../components/BookModal";
import Loading from "../../components/Loading";

const FlightPage = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetFlightDetailsQuery(id);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [createBooking] = useCreateBookingMutation();

  if (isLoading) return <Loading></Loading>;

  const flight = data?.data || null;
  if (!flight) return <div>Flight not found</div>;

  const handleBookingSubmit = async () => {
    const bookingData = {
      userId: user._id,
      flightId: flight._id,
      numberOfSeats: Number(numberOfSeats),
    };

    console.log(bookingData);

    const swalInstance = Swal.fire({
      title: "Confirming your booking...",
      text: "Please wait while we confirm your booking.",
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    try {
      await createBooking(bookingData);

      swalInstance.close();
      Swal.fire({
        title: "Success!",
        text: "Your booking was created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setOpenModal(false);

        navigate("/dashboard/user/bookings");
      });
    } catch (error) {
      swalInstance.close();
      Swal.fire({
        title: "Error!",
        text: "There was an error with your booking.",
        icon: "error",
        confirmButtonText: "OK",
      });
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
      <BookModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        numberOfSeats={numberOfSeats}
        setNumberOfSeats={setNumberOfSeats}
        user={user}
        handleBookingSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default FlightPage;
