import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const storedRole = localStorage.getItem("role");

  const allowedRoles = Array.isArray(role) ? role : [role];

  if (!allowedRoles.includes(storedRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;