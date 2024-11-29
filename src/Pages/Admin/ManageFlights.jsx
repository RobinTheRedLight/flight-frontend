/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetFlightsQuery,
  useAddFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
} from "../../redux/features/flights/flightsApi";
import Swal from "sweetalert2";

const ManageFlights = () => {
  const [addFlight, { isLoading: isAdding }] = useAddFlightMutation();
  const [updateFlight, { isLoading: isUpdating }] = useUpdateFlightMutation();
  const [deleteFlight, { isLoading: isDeleting }] = useDeleteFlightMutation();

  const { data: flights, isLoading: flightsLoading } = useGetFlightsQuery();

  const [editFlight, setEditFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editFlight) {
      setValue("flightNumber", editFlight.flightNumber);
      setValue("airline", editFlight.airline);
      setValue("origin", editFlight.origin);
      setValue("destination", editFlight.destination);
      setValue("date", editFlight.date.substring(0, 10));
      setValue("time", editFlight.time);
      setValue("price", editFlight.price);
      setValue("availableSeats", editFlight.availableSeats);
    }
  }, [editFlight, setValue]);

  const onSubmitAdd = async (data) => {
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price),
        availableSeats: parseInt(data.availableSeats, 10),
        date: new Date(data.date).toISOString(),
      };
      await addFlight(formattedData).unwrap();
      Swal.fire("Success!", "Flight added successfully.", "success");
      resetForm();
      setShowModal(false); 
    } catch (err) {
      Swal.fire("Error!", "Failed to add flight.", "error");
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      if (!editFlight) return;

      const formattedData = {
        ...data,
        price: parseFloat(data.price),
        availableSeats: parseInt(data.availableSeats, 10),
        date: new Date(data.date).toISOString(),
      };

      await updateFlight({
        id: editFlight._id,
        updatedData: formattedData,
      }).unwrap();
      Swal.fire("Success!", "Flight updated successfully.", "success");
      setEditFlight(null);
      setShowModal(false);
    } catch (err) {
      Swal.fire("Error!", "Failed to update flight.", "error");
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      await deleteFlight(id).unwrap();
      Swal.fire("Success!", "Flight deleted successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to delete flight.", "error");
    }
  };

  const resetForm = () => {
    setEditFlight(null);
    reset();
  };

  const formatTime = (time) => {
    // Convert time to a more readable format
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddFlightClick = () => {
    setEditFlight(null); // Ensure we are not in edit mode when adding new flight
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Manage Flights</h1>

      {/* Add Flight Button */}
      <button
        onClick={handleAddFlightClick}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md mb-4 hover:bg-green-600 focus:outline-none"
      >
        Add New Flight
      </button>

      {/* Flight Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {editFlight ? "Update Flight" : "Add New Flight"}
              </h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleSubmit(editFlight ? onSubmitUpdate : onSubmitAdd)}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Flight Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("flightNumber", {
                    required: "Flight number is required",
                  })}
                />
                {errors.flightNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.flightNumber.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Airline</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("airline", { required: "Airline is required" })}
                />
                {errors.airline && (
                  <p className="text-red-500 text-sm">
                    {errors.airline.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Origin</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("origin", { required: "Origin is required" })}
                />
                {errors.origin && (
                  <p className="text-red-500 text-sm">
                    {errors.origin.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Destination</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("destination", {
                    required: "Destination is required",
                  })}
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("time", { required: "Time is required" })}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("price", {
                    required: "Price is required",
                    min: 0,
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">Available Seats</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("availableSeats", {
                    required: "Available seats are required",
                    min: 0,
                  })}
                />
                {errors.availableSeats && (
                  <p className="text-red-500 text-sm">
                    {errors.availableSeats.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                disabled={isAdding || isUpdating}
              >
                {isAdding || isUpdating
                  ? "Processing..."
                  : editFlight
                  ? "Update Flight"
                  : "Add Flight"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Flight List */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">All Flights</h2>
        {flightsLoading ? (
          <div className="text-center">Loading flights...</div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border border-gray-300">
                  Flight Number
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Airline
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Origin
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Destination
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Date
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Time
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Price
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Available Seats
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {flights?.data.map((flight) => (
                <tr key={flight._id} className="odd:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.flightNumber}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.airline}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.origin}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.destination}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(flight.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {formatTime(flight.time)}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {flight.availableSeats}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                      onClick={() => {
                        setEditFlight(flight);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteFlight(flight._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageFlights;
