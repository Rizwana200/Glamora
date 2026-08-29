import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="d-flex">
        <aside className="bg-dark text-white p-4 min-vh-100" style={{ width: "260px" }}>
          <h3 className="mb-4">Glamora</h3>
          <p className="text-secondary small">Admin Panel</p>

          <nav className="nav flex-column gap-2">
            <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? "bg-secondary" : "text-white"}`}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/appointments" className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? "bg-secondary" : "text-white"}`}>
              Appointments
            </NavLink>
            <NavLink to="/admin/services" className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? "bg-secondary" : "text-white"}`}>
              Services
            </NavLink>
            <NavLink to="/admin/create" className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? "bg-secondary" : "text-white"}`}>
              Create Admin
            </NavLink>
          </nav>

          <div className="mt-5 border-top pt-3">
            <p className="mb-2 fw-semibold">{admin?.name || "Admin"}</p>
            <p className="small text-secondary">{admin?.email || ""}</p>
            <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;