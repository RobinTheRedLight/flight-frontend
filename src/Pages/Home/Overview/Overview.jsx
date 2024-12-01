import {
  FaSearch,
  FaRegCalendarAlt,
  FaListAlt,
  FaUserCircle,
} from "react-icons/fa";

const Overview = () => {
  return (
    <div className=" max-w-7xl mx-auto">
      {/* Overview Content Section */}
      <section className="py-8 px-6 md:px-20">
        <div className="container mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1: Search for Flights */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <FaSearch className="text-4xl text-black mb-4 mx-auto" />
            <h2 className="text-2xl font-black text-black mb-2">
              Search for Flights
            </h2>
            <p className="text-lg text-gray-700">
              Enter your origin, destination, and date to find the best flight
              options.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Start Searching
              </a>
            </div>
          </div>

          {/* Step 2: View Available Flights */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <FaListAlt className="text-4xl text-black mb-4 mx-auto" />
            <h2 className="text-2xl font-black text-black mb-2">
              View All Available Flights
            </h2>
            <p className="text-lg text-gray-700">
              Browse all available flights based on your search and pick the
              best one.
            </p>
            <div className="mt-6">
              <a
                href="/flights"
                className="bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                View Flights
              </a>
            </div>
          </div>

          {/* Step 3: Manage Your Bookings */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <FaUserCircle className="text-4xl text-black mb-4 mx-auto" />
            <h2 className="text-2xl font-black text-black mb-2">
              Your Dashboard
            </h2>
            <p className="text-lg text-gray-700">
              View your current and past bookings, and manage upcoming trips
              easily.
            </p>
            <div className="mt-6">
              <a
                href="/dashboard/profile"
                className="bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-black text-black mb-6">How It Works</h2>
          <p className="text-lg text-gray-700 mb-6">
            Booking a flight has never been easier. Follow these simple steps:
          </p>
          <div className="flex justify-center space-x-12">
            <div className="flex flex-col items-center">
              <FaSearch className="text-4xl text-black mb-4" />
              <p className="text-lg text-gray-700">Search for Flights</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCalendarAlt className="text-4xl text-black mb-4" />
              <p className="text-lg text-gray-700">Pick your Dates</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-4xl text-black mb-4" />
              <p className="text-lg text-gray-700">Manage Your Bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-black text-black mb-6">Need Help?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Have questions or need assistance? Our support team is just a click
          away.
        </p>
        <div>
          <a
            href="/contact"
            className="bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default Overview;
