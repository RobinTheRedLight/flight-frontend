/* eslint-disable react/prop-types */

const BookModal = ({
  openModal,
  setOpenModal,
  numberOfSeats,
  setNumberOfSeats,
  user,
  handleBookingSubmit,
}) => {
  if (!openModal) return null;

  return (
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
  );
};

export default BookModal;
