import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data || []);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Our Premium Services</h1>
        <p className="text-muted">Browse all salon services with transparent pricing.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-5">No services available right now.</div>
      ) : (
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-6 col-lg-4" key={service.service_id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{service.service_name}</h5>
                  <p className="card-text text-muted">
                    {service.description || "Professional salon service"}
                  </p>
                  <h4 className="text-dark">₹ {Number(service.price).toLocaleString("en-IN")}</h4>
                  <Link to="/book" className="btn btn-warning mt-3">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ServicesPage;