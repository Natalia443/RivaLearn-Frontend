import Body from "./Body";

export default function LandingPage() {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#35aad1",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Body />
      <footer className="text-center py-3">
        <div className="container">
          <p className="mb-0">
            &copy; 2024 RivaLearn. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
