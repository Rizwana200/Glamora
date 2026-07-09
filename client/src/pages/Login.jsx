import { useNavigate } from "react-router-dom";
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

      alert(response.data.message);
           localStorage.setItem("user", JSON.stringify(response.data.user));

            window.location.reload();

      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="card border-0 shadow-sm p-4">
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
              />
            </div>

            <button className="btn btn-warning w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;