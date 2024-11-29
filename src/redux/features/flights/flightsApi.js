import { baseApi } from "../../api/baseApi";

export const flightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: () => ({
        url: "/flights",
        method: "GET",
      }),
      providesTags: ["Flights"],
    }),

    getFlightDetails: builder.query({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "GET",
      }),
      providesTags: ["Flight"],
    }),

    addFlight: builder.mutation({
      query: (newFlightData) => ({
        url: "/flights",
        method: "POST",
        body: newFlightData,
      }),
      invalidatesTags: ["Flights", "Flight"],
    }),

    updateFlight: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/flights/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Flights", "Flight"],
    }),

    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Flights", "Flight"],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useGetFlightDetailsQuery,
  useAddFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} = flightsApi;
