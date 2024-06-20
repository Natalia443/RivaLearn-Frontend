import React, { useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Contexto } from '../context/contexto';
import { useNavigate } from "react-router-dom";

export function Home({ setUser }) {
  const { autenticado, setAutenticado } = useContext(Contexto);
  const [autenticadoLocal, setAutenticadoLocal] = useState(false);
  const [username, setUsername] = useState();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    setAutenticadoLocal(autenticado);
    setUsername(Cookies.get("username"));
  }, [autenticado]);

  useEffect(() => {
    fetch('/home.json')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error al cargar las opciones:', error));
  }, []);

  const handleLogOut = () => {
    Cookies.remove("access_token");
    setAutenticadoLocal(false);
    setAutenticado(false);
    setUser("");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="col-md-6">
          <h1>Bienvenido a RivaLearn, {username}</h1>
        </div>
      </div>
  
      <div className='row g-0'>
        {options.length === 0 ? (
        [...Array(3)].map((_, index) => (
          <div key={index} className="card mb-3 mx-4" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <div className="img-fluid rounded-start placeholder-glow" style={{ height: '100%', backgroundColor: '#e0e0e0' }}></div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                  <button className="btn btn-outline-primary disabled placeholder col-6" aria-disabled="true"></button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
          options.map((option) => (
            <div key={option.name} className="card mb-3 mx-4" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={option.img} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{option.name}</h5>
                    <p className="card-text">{option.summary}</p>
                    <button className="btn btn-outline-primary" onClick={() => navigate(option.navigate)}>Acceder</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
  
      <button className="btn btn-danger my-2" onClick={handleLogOut}>Cerrar sesión</button>
    </div>
  );
}
