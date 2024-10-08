import React, { useState } from "react";
import userService from "../../service/userService.js";
import { useInput } from "../../hooks/useInput.js";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { error, submit } = useInput(
    userService.saveUser,
    username,
    password,
    "Usuario, correo y/o contraseña incorrectos",
    email
  );

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <h1>Registro de Usuario</h1>
            <form onSubmit={submit}>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder="Nombre de Usuario"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder="Correo Electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
