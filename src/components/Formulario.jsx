import "./Formulario.css"
import { useState } from "react"
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
    <section>
  <h1>Log in</h1>
  <div className="formulario-container">
    <form
      className="formulario"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button>Iniciar Sesion</button>
      <button className="crear-cuenta" onClick={handleClick}>Cree su cuenta</button>
  {error && <p className="error-message">Todos los campos son obligatorios</p>}
  {errorAutenticacion && <p className="error-message">Usuario y/o contraseña incorrectos</p>}
    </form>
  </div>
</section>

    
  );
}

