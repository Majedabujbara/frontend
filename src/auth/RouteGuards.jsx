import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth.js";

/** Only signed-in users can see the page. Everyone else goes to login. */
export function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

/**
 * Login / register pages. A signed-in user is sent to the dashboard,
 * so the browser back arrow can never show the login page again.
 */
export function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}
