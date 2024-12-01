/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);

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

  const handleDeleteFlight = async () => {
    try {
      await deleteFlight(flightToDelete._id).unwrap();
      Swal.fire("Success!", "Flight deleted successfully.", "success");
      setShowDeleteConfirmation(false);
      setFlightToDelete(null);
    } catch (err) {
      Swal.fire("Error!", "Failed to delete flight.", "error");
    }
  };

  const resetForm = () => {
    setEditFlight(null);
    reset();
  };

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddFlightClick = () => {
    setEditFlight(null);
    setShowModal(true);
  };

  const handleEditClick = (flight) => {
    setEditFlight(flight);
    setShowModal(true);
  };

  const handleDeleteClick = (flight) => {
    setFlightToDelete(flight);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setFlightToDelete(null);
  };

  return (
    <div className="w-full p-4 lg:max-w-7xl mx-auto mt-14 lg:mt-5">
      <h1 className="text-3xl font-bold mb-6">Manage Flights</h1>

      {/* Add Flight Button */}
      <button
        onClick={handleAddFlightClick}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md mb-4 hover:bg-green-600 focus:outline-none"
      >
        Add New Flight
      </button>

      {/* Add/Edit Flight Modal */}
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
              {/* Flight Form Fields */}
              <div className="mb-4">
                <label
                  htmlFor="flightNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Flight Number
                </label>
                <input
                  id="flightNumber"
                  type="text"
                  {...register("flightNumber", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.flightNumber && (
                  <p className="text-red-500 text-xs">
                    Flight Number is required
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="airline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Airline
                </label>
                <input
                  id="airline"
                  type="text"
                  {...register("airline", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.airline && (
                  <p className="text-red-500 text-xs">Airline is required</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Origin
                </label>
                <input
                  id="origin"
                  type="text"
                  {...register("origin", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.origin && (
                  <p className="text-red-500 text-xs">Origin is required</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destination
                </label>
                <input
                  id="destination"
                  type="text"
                  {...register("destination", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.destination && (
                  <p className="text-red-500 text-xs">
                    Destination is required
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  {...register("date", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs">Date is required</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  {...register("time", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.time && (
                  <p className="text-red-500 text-xs">Time is required</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">Price is required</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="availableSeats"
                  className="block text-sm font-medium text-gray-700"
                >
                  Available Seats
                </label>
                <input
                  id="availableSeats"
                  type="number"
                  {...register("availableSeats", { required: true })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.availableSeats && (
                  <p className="text-red-500 text-xs">
                    Available Seats are required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                  disabled={isAdding || isUpdating}
                >
                  {isAdding || isUpdating ? (
                    <span>Loading...</span>
                  ) : editFlight ? (
                    "Update Flight"
                  ) : (
                    "Add Flight"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you want to delete this flight?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFlight}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flights Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Flight Number
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Airline
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Origin
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Destination
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Time
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Available Seats
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {flightsLoading ? (
              <tr>
                <td colSpan="9" className="py-2 px-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              flights.data.map((flight) => (
                <tr key={flight._id}>
                  <td className="py-2 px-4 border-b">{flight.flightNumber}</td>
                  <td className="py-2 px-4 border-b">{flight.airline}</td>
                  <td className="py-2 px-4 border-b">{flight.origin}</td>
                  <td className="py-2 px-4 border-b">{flight.destination}</td>
                  <td className="py-2 px-4 border-b">
                    {flight.date.substring(0, 10)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatTime(flight.time)}
                  </td>
                  <td className="py-2 px-4 border-b">${flight.price}</td>
                  <td className="py-2 px-4 border-b">
                    {flight.availableSeats}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditClick(flight)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(flight)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFlights;
