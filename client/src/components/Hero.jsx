import { Link } from "react-router-dom";
import unnamed from "../assets/unnamed.webp";

function Hero() {
  return (
    <section className="bg-light text-center py-5">
      <div className="container-fluid">
        <div
          className="p-5 text-center bg-dark text-white"
          style={{
            backgroundImage: `url(${unnamed})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        <h1 className="display-4 fw-bold">
          Style Up Studio
        </h1>

        <p className="lead mt-3">
           Premium Salon Services for Men and Women
        </p>

        <Link to="/book" className="btn btn-warning me-3">
          Book Appointment
        </Link>

        <Link to="/services" className="btn btn-outline-light">
          Our Services
        </Link>
      </div>
      </div>
    </section>
  );
}

export default Hero;