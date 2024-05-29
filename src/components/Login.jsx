import { useState, useEffect } from "react";
import React, { useContext } from 'react';
import { Contexto } from '../context/contexto.jsx';
import { useNavigate } from 'react-router-dom';
import client from '../service/userService.js'; 
import Cookies from "js-cookie";

export function LoginForm({ setUser }) {
  const { autenticado, setAutenticado } = useContext(Contexto);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log('Valor de autenticado desde el contexto:', autenticado);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const username = Cookies.get("username");

    if (accessToken && username) {
      setUser(username); 
      navigate('/');
    }

  
    console.log('useEffect - Valor de autenticado desde el contexto:', autenticado);
  }, [navigate, setUser, autenticado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    setError(false);

    try {
      const response = await client.login(username, password);
      setUser(response.username); 
      setAutenticado(true); // Cambiar el estado de autenticado en el contexto
      navigate('/');
    } catch (error) {
      setErrorMessage("Usuario y/o contraseña incorrectos");
      setError(true);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registro');
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
                onChange={e => setUsername(e.target.value)}
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
              <button className="btn btn-primary mx-1" type="submit">Enviar</button>
              <button className="btn btn-primary" type="button" onClick={handleRegisterClick}>Crear cuenta</button>
            </div>
            {error && <p className="text-danger">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
