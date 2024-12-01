import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // React Icons
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
} from "../../redux/features/user/userApi";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const { data, isLoading } = useGetSingleUserQuery(user._id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (isLoading) return <div>Loading...</div>;

  const profile = data?.data || {};

  const { name, email, phone, image, address } = profile;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setFormData({
      name,
      phone,
      address,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ profileData: formData, id: user._id }).unwrap();
    closeModal();
  };

  return (
    <div className="w-full mx-auto p-8 ">
      {/* Profile Card */}
      <div className="bg-white shadow-2xl rounded-xl p-6 flex flex-col sm:flex-row">
        <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 rounded-full border-4 border-green-500 object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">{name}</h2>
          <p className="text-lg text-gray-600 mb-3">
            <FaEnvelope className="inline mr-2 text-green-500" />
            {email}
          </p>
          <p className="text-lg text-gray-600 mb-3">
            <FaPhoneAlt className="inline mr-2 text-green-500" />
            {phone}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <FaMapMarkerAlt className="inline mr-2 text-green-500" />
            {address}
          </p>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleUpdateProfile}>
              {/* Name */}
              <div className="mb-5">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Address */}
              <div className="mb-5">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
