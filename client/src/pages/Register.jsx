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
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      setSuccessMessage(
        response.data.message || "Registration successful!"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <section className="register-container">
      <div className="register-row">

        {/* LEFT SIDE */}
        <div className="register-info">

          <div className="register-logo">
            <h1>Glamora</h1>
            <p>BEAUTY • STYLE • CONFIDENCE</p>
          </div>

          <div className="register-welcome">
            <span>✦</span>

            <h2>
              Your Beauty Journey
              <br />
              <strong>Starts Here</strong>
            </h2>

            <p>
              Create your Glamora account and enjoy a beautiful,
              simple and personalized salon experience.
            </p>
          </div>

          <div className="register-features">

            <div className="feature-item">
              <div className="feature-icon">✦</div>
              <div>
                <h3>Easy Booking</h3>
                <p>Book your favorite salon services easily.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">♡</div>
              <div>
                <h3>Personal Experience</h3>
                <p>Keep track of your appointments in one place.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <h3>Secure Account</h3>
                <p>Your personal information stays protected.</p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-form-section">

          <div className="register-card">

            <div className="register-card-header">
              <h2>Create Account</h2>
              <p>
                Join Glamora and discover your beauty experience.
              </p>
            </div>

            {successMessage && (
              <div className="register-success">
                ✓ {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="register-error">
                ! {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="register-form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label>Password</label>

                <div className="register-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="register-form-group">
                <label>Confirm Password</label>

                <div className="register-password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="register-create-button"
              >
                Create My Account
              </button>

            </form>

            <div className="register-login">
              <p>
                Already have an account?{" "}
                <Link to="/login">Sign in</Link>
              </p>
            </div>

            <div className="register-secure">
              🔒 Secure & Encrypted
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Register;