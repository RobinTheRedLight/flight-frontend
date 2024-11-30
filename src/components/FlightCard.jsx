/* eslint-disable react/prop-types */
const FlightCard = ({ flight }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 hover:shadow-2xl transition-shadow">
      <h3 className="text-2xl font-semibold text-gray-800">{flight.airline}</h3>
      <p className="text-gray-600">
        <strong>Flight Number:</strong> {flight.flightNumber}
      </p>
      <p className="text-gray-600">
        <strong>Origin:</strong> {flight.origin} <strong>Destination:</strong>{" "}
        {flight.destination}
      </p>
      <p className="text-gray-600">
        <strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}{" "}
        <strong>Time:</strong> {flight.time}
      </p>
      <p className="text-gray-600">
        <strong>Price:</strong> ${flight.price}{" "}
        <strong>Available Seats:</strong> {flight.availableSeats}
      </p>
    </div>
  );
};

export default FlightCard;
