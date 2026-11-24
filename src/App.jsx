import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx";
import Registration from "./registration/registration.tsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { ProtectedRoute, PublicRoute } from "./auth/RouteGuards.jsx";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Registration />
                    </PublicRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
