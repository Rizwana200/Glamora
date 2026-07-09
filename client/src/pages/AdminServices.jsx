import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ service_name: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data || []);
    } catch (error) {
      console.error("Error loading services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, form);
      } else {
        await api.post("/services", form);
      }

      setForm({ service_name: "", price: "", description: "" });
      setEditingId(null);
      setMessage(editingId ? "Service updated successfully." : "Service added successfully.");
      fetchServices();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save service");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.service_id);
    setMessage("");
    setForm({
      service_name: service.service_name,
      price: service.price,
      description: service.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      setMessage("Service deleted successfully.");
      fetchServices();
    } catch (error) {
      setMessage("Failed to delete service");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Manage Services</h2>
          <p className="text-muted mb-0">Create, edit, and remove salon services from here.</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? "Edit Service" : "Add New Service"}</h5>
          {message && <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"} py-2 mt-2`}>{message}</div>}
          <form onSubmit={handleSubmit} className="row g-3 mt-1">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Service Name"
                value={form.service_name}
                onChange={(e) => setForm({ ...form, service_name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-dark" type="submit">{editingId ? "Update" : "Add"}</button>
              {editingId && (
                <button className="btn btn-outline-secondary" type="button" onClick={() => { setEditingId(null); setForm({ service_name: "", price: "", description: "" }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4 text-muted">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="p-4 text-muted">No services are currently available. Add one above to show it here.</div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.service_id}>
                    <td>{service.service_name}</td>
                    <td>₹ {Number(service.price).toLocaleString("en-IN")}</td>
                    <td>{service.description || "-"}</td>
                    <td>
                      <button className="btn btn-outline-dark btn-sm me-2" onClick={() => handleEdit(service)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(service.service_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;