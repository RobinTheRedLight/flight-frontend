import { baseApi } from "../../api/baseApi";

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),

   
    getUserBookings: builder.query({
      query: (userId) => ({
        url: `/bookings/user/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Booking", id: userId },
      ],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }],
    }),

 
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Booking", id }],
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
