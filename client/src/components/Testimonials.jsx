function Testimonials() {
  return (
    <section className="bg-light py-5">
      <div className="container-fluid">
        <h2 className="text-center mb-5">
          What Our Clients Say
        </h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card p-4">
              <p>
                "Amazing service and friendly staff!"
              </p>
              <h5>- Priya Sharma</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4">
              <p>
                "Best salon experience I've ever had."
              </p>
              <h5>- Rahul Verma</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;