import { baseApi } from "../../api/baseApi";

export const flightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: () => ({
        url: "/flights",
        method: "GET",
      }),
      providesTags: ['Flights'],
    }),

    getFlightDetails: builder.query({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Flight', id }],
    }),

    addFlight: builder.mutation({
      query: (newFlightData) => ({
        url: "/flights",
        method: "POST",
        body: newFlightData,
      }),
      invalidatesTags: ['Flights'],
    }),

    updateFlight: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/flights/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Flight', id }],
    }),

    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Flight', id }],
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
