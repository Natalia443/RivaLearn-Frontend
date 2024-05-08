import React from 'react';
import userService from '../service/userService';

export function Registro() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
                  id="username"
                  name="username"
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder='Correo Electrónico'
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div>
                <input
                  className="form-control mb-3"
                  placeholder='Contraseña'
                  type="password"
                  id="password"
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