import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookAppointment() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(storedUser);

    setUser(loggedInUser);

    setFormData((previous) => ({
      ...previous,
      customer_name: loggedInUser.name || "",
      phone: loggedInUser.phone || "",
    }));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          customer_id: user.id || user.customer_id,
          customer_name: user.name || formData.customer_name,
          phone: formData.phone,
          service: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
        }
      );

      alert(response.data.message);

      // Keep customer logged in
      localStorage.setItem("user", JSON.stringify(user));

      // Clear only appointment form fields
      setFormData({
        customer_name: user.name || "",
        phone: user.phone || formData.phone,
        service: "",
        date: "",
        time: "",
      });

      // Go to customer's dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to book appointment"
      );
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">

      <h2 className="text-center mb-4">
        Book Your Appointment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="col-md-6 mx-auto shadow p-4 rounded"
      >

        <div className="mb-3">
          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            className="form-control"
            value={formData.customer_name}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Select Service
          </label>

          <select
            className="form-select"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">
              Choose Service
            </option>

            <option>Hair Cut</option>
            <option>Hair Styling</option>
            <option>Facial</option>
            <option>Hair Coloring</option>
            <option>Beard Grooming</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Appointment Date
          </label>

          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Appointment Time
          </label>

          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
        >
          Book Appointment
        </button>

      </form>

    </div>
  );
}

export default BookAppointment;