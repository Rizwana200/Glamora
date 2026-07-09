import { useState, useEffect } from "react";
import api from "../api/axios";

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");
  const [appointments, setAppointments] = useState([]);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/admin/appointments");
        const data = response.data || [];
        setAppointments(data);
        setPending(data.filter((a) => (a.status || "").toLowerCase() === "pending").length);
        setApproved(data.filter((a) => (a.status || "").toLowerCase() === "approved").length);
        setRejected(data.filter((a) => (a.status || "").toLowerCase() === "rejected").length);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Welcome, {admin?.name || "Admin"}</h2>
          <p className="text-muted mb-0">Manage appointments and salon services from one place.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Total Appointments</h5>
              <h2 className="display-6">{appointments.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2 className="display-6">{pending}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <h2 className="display-6">{approved}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <h2 className="display-6">{rejected}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;