import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminCreateAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (formData.password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters." });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/admin/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setMessage({ type: "success", text: response.data.message || "Admin created successfully." });
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/admin/dashboard"), 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to create admin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Create Admin</h2>
          <p className="text-muted mb-0">Add a new administrator account for the salon panel.</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ maxWidth: "700px" }}>
        <div className="card-body p-4">
          {message.text && (
            <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter admin name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateAdmin;
