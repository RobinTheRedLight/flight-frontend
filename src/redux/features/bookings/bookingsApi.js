import { baseApi } from "../../api/baseApi";

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Flights", "Flight", "Bookings", "Booking"],
    }),

    getUserBookings: builder.query({
      query: (userId) => ({
        url: `/bookings/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    updateBooking: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Bookings", "Booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings", "Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;
