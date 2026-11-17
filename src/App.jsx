import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx";
import Registration from "./registration/registration.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
