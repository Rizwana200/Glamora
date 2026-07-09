import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoute() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");
  const token = localStorage.getItem("adminToken");

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
