import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      localStorage.setItem("adminToken", response.data.token);
      

      alert(response.data.message);

      navigate("/admin/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <> 
      <section>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">
              Style Up Studio - Admin
            </span>
          </div>
        </nav>
      </section>

      <div className="container py-5">
        <h2 className="text-center">Admin Login</h2>

        <form
          className="col-md-5 mx-auto mt-4"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </> 
  );
}

export default AdminLogin;