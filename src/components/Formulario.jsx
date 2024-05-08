import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorAutenticacion, setErrorAutenticacion] = useState(false);
  const navigate = useNavigate();

  const admin = {
    username: "admin",
    password: "12345"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "" || password === "") {
      setError(true);
      return;
    }

    setError(false);

    if (usuario !== admin.username || password !== admin.password) {
      setErrorAutenticacion(true);
      return;
    }

    setUser([usuario]);
  };

  const handleClick = () => {
    navigate('/registro');
  };

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <h1>Inicio de Sesión</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control mb-3"
                  type="text"
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  placeholder="Usuario"
                  required
                />
                <input
                  className="form-control mb-3"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary mx-1">Enviar</button>
                <button className="btn btn-primary" onClick={handleClick}>Crear cuenta</button>
              </div>
              {error && <p className="text-danger">Todos los campos son obligatorios</p>}
              {errorAutenticacion && <p className="text-danger">Usuario y/o contraseña incorrectos</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}