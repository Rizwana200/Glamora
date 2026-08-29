import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="glamora-hero">
      <div className="hero-decoration hero-decoration-one"></div>
      <div className="hero-decoration hero-decoration-two"></div>

      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-small-title">✦ BEAUTY & SALON ✦</span>

          <h1>
            Welcome to
            <span> Glamora</span>
          </h1>

          <h2>Your Beauty, Our Passion</h2>

          <p>
            Discover premium beauty and salon services designed
            to make you look and feel your absolute best.
          </p>

          <div className="hero-buttons">
            <Link to="/book" className="hero-btn primary-btn">
              <span>♡</span>
              Book Appointment
            </Link>

            <Link to="/services" className="hero-btn secondary-btn">
              <span>✦</span>
              Explore Services
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>5+</strong>
              <span>Beauty Services</span>
            </div>

            <div className="hero-stat-line"></div>

            <div>
              <strong>100%</strong>
              <span>Customer Care</span>
            </div>

            <div className="hero-stat-line"></div>

            <div>
              <strong>Premium</strong>
              <span>Experience</span>
            </div>
          </div>
        </div>

        <div className="hero-design">
          <div className="hero-circle hero-circle-large">
            <div className="hero-circle-inner">
              <span className="crown">♕</span>
              <span className="glamora-letter">G</span>
              <span className="beauty-text">GLAMORA</span>
              <span className="salon-text">BEAUTY & SALON</span>
            </div>
          </div>

          <div className="floating-card card-top">
            <span>✦</span>
            <div>
              <strong>Premium</strong>
              <small>Beauty Care</small>
            </div>
          </div>

          <div className="floating-card card-bottom">
            <span>♡</span>
            <div>
              <strong>Feel Beautiful</strong>
              <small>Every single day</small>
            </div>
          </div>

          <div className="sparkle sparkle-one">✦</div>
          <div className="sparkle sparkle-two">✧</div>
          <div className="sparkle sparkle-three">✦</div>
        </div>
      </div>

      <div className="hero-bottom-wave"></div>
    </section>
  );
}

export default Hero;