function Footer() {
  return (
    <footer className="glamora-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">Glamora</div>

          <p className="footer-tagline">
            BEAUTY • STYLE • CONFIDENCE
          </p>

          <p className="footer-description">
            Glamora is your destination for premium beauty and
            salon services. We create beautiful experiences with
            professional care, style and elegance.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/book">Book Appointment</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <span>Haircut & Styling</span>
          <span>Hair Coloring</span>
          <span>Facial</span>
          <span>Manicure</span>
          <span>Bridal Makeup</span>
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact Glamora</h3>

          <p>
            <span>📍</span>
            Kurnool, Andhra Pradesh - 509128
          </p>

          <p>
            <span>📞</span>
            +91 73821 32251
          </p>

          <p>
            <span>⏰</span>
            Open: 8:30 AM - 9:30 PM
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 <strong>Glamora</strong>. All Rights Reserved.
        </p>

        <p>
          Kurnool, Andhra Pradesh
        </p>
      </div>
    </footer>
  );
}

export default Footer;