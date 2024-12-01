import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineFlightClass } from "react-icons/md";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox && drawerCheckbox.checked) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open bg-[#F2F4F7]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="flex btn btn-outline drawer-button lg:hidden fixed top-0 left-0 right-0 bg-blue-300"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-52 min-h-full bg-white ">
          {user.role === "admin" ? (
            <>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/profile">
                  <FaHome /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/admin/flights">
                  <RiFlightTakeoffFill />
                  Manage Flights
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/admin/bookings">
                  <MdOutlineFlightClass /> Manage Bookings
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/profile">
                  <FaHome />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/user/bookings">
                  <MdOutlineFlightClass /> My Bookings
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink onClick={closeDrawer} to="/">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
