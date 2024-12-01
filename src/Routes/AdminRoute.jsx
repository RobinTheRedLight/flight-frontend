/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (user.role !== undefined && user.role !== "admin") {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};
export default AdminRoute;
