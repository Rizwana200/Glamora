import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get(`/appointments/${user.id}`);
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container py-5">
      <h2 className="mt-5">Welcome, {user.name} 👋</h2>

      <h4 className="mt-4">My Appointments</h4>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Customer ID</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Appointments Found
              </td>
            </tr>
          ) : (
            appointments.map((appointment, index) => (
              <tr key={appointment.appointment_id}>
                <td>{index + 1}</td>
                <td>{appointment.service}</td>
                <td>{new Date(appointment.appointment_date).toLocaleDateString("en-GB")}</td>
                <td>{appointment.appointment_time.slice(0, 5)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default Dashboard;