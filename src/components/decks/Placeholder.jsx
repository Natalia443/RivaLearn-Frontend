export default function PlaceHolder() {
  return (
    <div className="row flex-grow-1">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="col-md-4 mb-3">
          <div className="card placeholder-glow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <div className="mt-auto">
                <button
                  className="btn btn-primary disabled placeholder col-6"
                  aria-disabled="true"
                ></button>
                <button
                  className="btn btn-danger position-absolute placeholder col-4"
                  style={{ bottom: "15px", right: "10px" }}
                  aria-disabled="true"
                ></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
