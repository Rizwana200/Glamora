import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function Login() {
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
      const response = await api.post("/auth/login", formData);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.dispatchEvent(new Event("userLogin"));

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="glamora-login-page">

      <div className="glamora-login-decoration decoration-one"></div>
      <div className="glamora-login-decoration decoration-two"></div>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-7 col-lg-5">

            <div className="glamora-login-card">

              {/* Brand */}
              <div className="glamora-login-brand">

                <div className="glamora-login-logo">
                  Glamora
                </div>

                <div className="glamora-login-line"></div>

                <p>
                  BEAUTY • STYLE • CONFIDENCE
                </p>

              </div>

              {/* Heading */}
              <div className="glamora-login-heading">

                <h1>Welcome Back</h1>

                <p>
                  Sign in to continue your beauty journey
                </p>

              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>

                <div className="glamora-login-field">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="glamora-login-field">

                  <div className="glamora-password-label">
                    <label htmlFor="password">
                      Password
                    </label>
                  </div>

                  <input
                    id="password"
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
                  className="glamora-customer-login"
                >
                  Login as Customer
                  <span>→</span>
                </button>

              </form>

              {/* Divider */}
              <div className="glamora-login-divider">
                <span>OR</span>
              </div>

              {/* Admin Login */}
              <Link
                to="/admin/login"
                className="glamora-admin-login"
              >
                <span>♛</span>
                Login as Admin
              </Link>

              {/* Register */}
              <div className="glamora-register-section">

                <p>
                  Don't have an account?
                </p>

                <Link to="/register">
                  Create your Glamora account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;