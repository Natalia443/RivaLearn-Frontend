import React, { useState } from 'react';
import userService from '../service/userService';

export function Registro() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await userService.saveUser(username, password, email);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder='Nombre de Usuario'
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  name="username"
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder='Correo Electrónico'
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder='Contraseña'
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registro;