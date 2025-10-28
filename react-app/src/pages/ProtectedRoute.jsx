import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/auth/login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  if (isLoading) return null;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
