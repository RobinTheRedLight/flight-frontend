import { useSearchParams } from "react-router-dom";
import { useGetFlightsQuery } from "../../redux/features/flights/flightsApi";
import FlightCard from "../../components/FlightCard";

const FlightsPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetFlightsQuery();

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const flights = data?.data || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const filteredFlights = flights.filter((flight) => {
    const formattedFlightDate = formatDate(flight.date);
    const isOriginMatch =
      origin === "" ||
      flight.origin.toLowerCase().includes(origin.toLowerCase());
    const isDestinationMatch =
      destination === "" ||
      flight.destination.toLowerCase().includes(destination.toLowerCase());
    const isDateMatch = date === "" || formattedFlightDate.includes(date);

    return isOriginMatch && isDestinationMatch && isDateMatch;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-8">
        Available Flights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))
        ) : (
          <p>No flights found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;