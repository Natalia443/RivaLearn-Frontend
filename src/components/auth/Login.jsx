import { useState, useEffect } from "react";
import userService from "../../service/userService.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useInput } from "../../hooks/useInput.js";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const username = Cookies.get("username");

    if (accessToken && username) {
      navigate("/");
    }
  }, [navigate]);

  const { error, submit } = useInput(
    userService.login,
    username,
    password,
    "Usuario y/o contraseña incorrectos"
  );

  const handleSubmit = async (e) => {
    await submit(e);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div className="card">
        <div className="card-body">
          <h1>Inicio de Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                required
              />
              <input
                className="form-control mb-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mx-1" type="submit">
                Enviar
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSignUpClick}
              >
                Crear cuenta
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
