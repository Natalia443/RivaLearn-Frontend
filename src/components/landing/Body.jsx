import logo from "../../assets/LOGO.png";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import Faq from "./Faq";

export default function Body() {
  const navigate = useNavigate();

  return (
    <>
      <div className="row align-items-center hero-section">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">RivaLearn</h1>
          <h3 className="lead mb-4">
            Aprende idiomas de forma eficiente y divertida.
          </h3>
          <button
            className="btn btn-primary btn-lg"
            onClick={() =>
              (window.location.href =
                "https://github.com/Natalia443/RivaLearn-Mobile")
            }
          >
            Descargar para Android
          </button>
        </div>
        <div className="col-md-6">
          <img src={logo} alt="Hero" className="img-fluid" />
        </div>
      </div>
      <Content />
      <div className="row justify-content-center my-5">
        <div className="col-md-6 text-center">
          <h2 className="mb-4">¿Listo para potenciar tu aprendizaje?</h2>
          <p className="lead mb-4">
            Registrate ahora mismo para comenzar a estudiar y disfrutar de todos
            nuestros beneficios.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/signup")}
          >
            Crear cuenta
          </button>
          <button
            className="btn btn-primary btn-lg mx-2"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
      <Faq />
    </>
  );
}
