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
        path: "/flights",
        element: <FlightsPage></FlightsPage>,
      },
      {
        path: "/flight/:id",
        element: <FlightPage></FlightPage>,
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
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path: "admin/flights",
        element: <ManageFlights></ManageFlights>,
      },
      {
        path: "admin/bookings",
        element: <ManageBookings></ManageBookings>,
      }
    ],
  },
]);
