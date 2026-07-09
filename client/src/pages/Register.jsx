import api from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters!");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setSuccessMessage(response.data.message || "Registration successful!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="register-container">
      <div className="register-row">
        {/* Left Side - Info Section */}
        <div className="register-col-md-6">
          <div className="info-content">
            <div className="logo-section">
              <h1 className="brand-name">Style Up</h1>
              <p className="brand-subtitle">Beauty & Salon Network</p>
            </div>

            <h2 className="info-title">
              Join Our Growing <br />
              <span className="highlight">Professional Network</span>
            </h2>

            <p className="info-description">
              Style Up Studios is a premium salon and beauty services platform connecting talented professionals with customers seeking quality beauty treatments across all categories.
            </p>

            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Beauty Professionals</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Service Types</div>
              </div>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <span className="check-icon">✓</span>
                <span>Easy appointment booking</span>
              </div>
              <div className="benefit-item">
                <span className="check-icon">✓</span>
                <span>Secure payment processing</span>
              </div>
              <div className="benefit-item">
                <span className="check-icon">✓</span>
                <span>Professional profile management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="register-form-col-md-6">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Welcome to Style Up</h2>
              <p className="form-subtitle">Create your account to get started</p>
            </div>

            {successMessage && (
              <div className="alert-success">
                <span className="success-icon">✓</span>
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="alert-error">
                <span className="error-icon">!</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-create-account">
                Create Account
              </button>
            </form>

            <div className="form-footer">
              <p>Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="security-badge">
              <span className="badge-icon">🔒</span>
              <span className="badge-text">Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;