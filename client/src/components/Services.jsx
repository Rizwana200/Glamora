import { useEffect, useState } from "react";
import api from "../api/axios";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data || []);
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="container-fluid py-5">
      <h2 className="text-center mb-5">Our Services</h2>

      <div className="row g-4">
        {services.map((service) => (
          <div className="col-md-4" key={service.service_id}>
            <div className="card shadow-sm p-4 text-center h-100">
              <h5>{service.service_name}</h5>
              <p className="text-muted mb-2">{service.description || "Professional salon service"}</p>
              <strong>₹ {Number(service.price).toLocaleString("en-IN")}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;