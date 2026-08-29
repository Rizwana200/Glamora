import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/admin/login", formData);

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      alert(response.data.message);

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Admin Login Failed"
      );
    }
  };

  return (
    <div className="glamora-admin-page">

      <div className="admin-login-wrapper">

        {/* LEFT BRANDING */}
        <div className="admin-brand-section">

          <div className="admin-brand-logo">
            Glamora
          </div>

          <div className="admin-brand-subtitle">
            BEAUTY • STYLE • CONFIDENCE
          </div>

          <div className="admin-brand-content">
            <p className="admin-small-heading">
              GLAMORA SALON
            </p>

            <h1>
              Where beauty
              <br />
              meets <span>elegance.</span>
            </h1>

            <p>
              Manage your salon appointments, services
              and customers from one beautiful place.
            </p>
          </div>

          <div className="admin-features">

            <div>
              <span>01</span>
              <p>Manage Appointments</p>
            </div>

            <div>
              <span>02</span>
              <p>Manage Services</p>
            </div>

            <div>
              <span>03</span>
              <p>Manage Customers</p>
            </div>

          </div>

        </div>

        {/* RIGHT LOGIN */}
        <div className="admin-form-section">

          <div className="admin-login-card">

            <div className="admin-crown">
              ♕
            </div>

            <p className="admin-card-label">
              GLAMORA ADMIN
            </p>

            <h2>
              Welcome back
            </h2>

            <p className="admin-card-description">
              Sign in to access your salon dashboard
            </p>

            <form onSubmit={handleSubmit}>

              <div className="admin-input-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="admin@glamora.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="admin-signin-btn"
              >
                Sign In
                <span>→</span>
              </button>

            </form>

            <div className="admin-divider">
              <span></span>
              <p>GLAMORA</p>
              <span></span>
            </div>

            <Link
              to="/login"
              className="customer-login-link"
            >
              ← Login as Customer
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;