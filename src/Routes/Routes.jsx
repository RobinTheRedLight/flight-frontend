import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AdminDashboard from "../Layout/AdminDashboard";
import ManageFlights from "../Pages/Admin/ManageFlights";
import FlightsPage from "../Pages/Flights/FlightsPage";
import FlightPage from "../Pages/Flight/FlightPage";
import ManageBookings from "../Pages/Admin/ManageBookings";
import Bookings from "../Pages/Bookings/Bookings";
import Profile from "../Pages/Profile/profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/flights",
        element: <FlightsPage></FlightsPage>,
      },
      {
        path: "/flight/:id",
        element: (
          <PrivateRoute>
            <FlightPage></FlightPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminDashboard></AdminDashboard>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin/flights",
        element: (
          <AdminRoute>
            <ManageFlights></ManageFlights>
          </AdminRoute>
        ),
      },
      {
        path: "admin/bookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>,
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "user/bookings",
        element: <Bookings></Bookings>,
      },
    ],
  },
]);
