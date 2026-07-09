import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function BookAppointment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first.");
      navigate("/login");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    customer_name: user?.name || "",
    phone: "",
    service: "",
    date: "",
    time: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          customer_id: user.id,
          customer_name: formData.customer_name,
          phone: formData.phone,
          service: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
        }
      );

      alert(response.data.message);

      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Book Your Appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="col-md-6 mx-auto shadow p-4 rounded"
      >
        <div className="mb-3">
          <label className="form-label">Full Name</label>

          <input
            type="text"
            className="form-control"
            value={formData.customer_name}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>

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
          <label className="form-label">Select Service</label>

          <select
            className="form-select"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Choose Service</option>
            <option>Hair Cut</option>
            <option>Hair Styling</option>
            <option>Facial</option>
            <option>Hair Coloring</option>
            <option>Beard Grooming</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Date</label>

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
          <label className="form-label">Appointment Time</label>

          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-dark w-100">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;