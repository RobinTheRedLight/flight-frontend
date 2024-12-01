import BookingCard from "../../components/BookingCard";
import Loading from "../../components/Loading";
import { useGetAllBookingsQuery } from "../../redux/features/bookings/bookingsApi";

const ManageBookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery();

  if (isLoading) return <Loading></Loading>;

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen mt-14 lg:mt-5 ">
      <div className="max-w-7xl mx-auto p-4 ">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900  mb-8">
          Manage Bookings
        </h1>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
