import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-52 bg-gray-800 text-white p-6">
        <div className="text-xl pl-4 font-bold mb-8">FlightBook</div>
        <nav>
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="block p-4 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="block p-4 hover:bg-gray-700"
              >
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/admin/flights"
                className="block p-4 hover:bg-gray-700"
              >
                Manage Flights
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block p-4 hover:bg-gray-700">
                Manage Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 shadow-md flex items-center justify-between">
          <div className="text-lg font-semibold">Welcome, Admin</div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Here the Outlet will render the child components based on the route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
