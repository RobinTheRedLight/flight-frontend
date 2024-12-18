/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import { useGetUserBookingsQuery } from "../../redux/features/bookings/bookingsApi";
import UserBookingCard from "../../components/UserBookingCard";
import Loading from "../../components/Loading";

const Bookings = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetUserBookingsQuery(user._id);

  if (isLoading) return <Loading></Loading>;

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="uppercase text-center text-3xl font-bold text-gray-900 mb-8">
          Your Bookings
        </h1>
        {bookings.length === 0 ? (
          <p className="text-lg text-gray-600 h-screen text-center">
            You don't have any bookings yet.
          </p>
        ) : (
          bookings.map((booking) => (
            <UserBookingCard key={booking._id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
