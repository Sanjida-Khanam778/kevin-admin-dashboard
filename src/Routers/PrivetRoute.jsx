import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRefetchAccessMutation } from "../Api/authApi";
import { setAccessToken } from "../features/authSlice";

export function PrivateRoute({ children }) {
  // Retrieve auth data from localStorage
  const Data = useSelector((state) => state.auth);
  const expiry = useSelector((state) => state.auth.expiry);
  const [refetchAccess] = useRefetchAccessMutation();
  const dispatch = useDispatch();

  const isTokenExpired = Date.now() > expiry;

  const refetchAccessToken = async () => {
    if (isTokenExpired && Data.refresh) {
      try {
        const res = await refetchAccess({ refresh: Data.refresh }).unwrap();
        dispatch(setAccessToken(res));
      } catch (error) {
        wondow.location.href = "/login";
      }
    }
  };

  setInterval(refetchAccessToken, 30 * 60 * 1000);

  // Check if user is not authenticated
  if (!Data.access && !Data.refresh) {
    return <Navigate to="/login" />;
  }

  // Check if user is not verified
  if (!Data.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // User meets all requirements
  return children;
}
