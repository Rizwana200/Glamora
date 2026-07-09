function Gallery() {
  return (
    <section className="container-fluid">
      <h2 className="text-center mb-5">Our Gallery</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035"
            className="img-fluid rounded shadow"
            alt="Salon" height="100"
          />
        </div>
S
        <div className="col-md-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f"
            className="img-fluid rounded shadow"
            alt="Hair Styling" height="100"
          />
        </div>

        <div className="col-md-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2"
            className="img-fluid rounded shadow"
            alt="Beauty" height="100"
          />
        </div>
      </div>
    </section>
  );
}

export default Gallery;