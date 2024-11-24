import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Check token or user in localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Check token or user in Redux (optional)
  const reduxToken = useSelector((state: any) => state.auth?.token);
  const reduxUser = useSelector((state: any) => state.auth?.user);

  const isAuthenticated = token || user || reduxToken || reduxUser;

  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
