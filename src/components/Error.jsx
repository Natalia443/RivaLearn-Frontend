import { Link } from "react-router-dom";
import MainNavBar from "./root/MainNavBar";

export default function ErrorPage() {
  return (
    <>
      <MainNavBar />
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 style={{ fontSize: "10rem" }}>404</h1>
        <Link to={`/`}>
          <p style={{ textAlign: "center" }}>Volver a la página principal</p>
        </Link>
      </div>
    </>
  );
}
