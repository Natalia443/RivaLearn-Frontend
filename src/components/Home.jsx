import React, { useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Contexto } from '../context/contexto';

export function Home({ setUser }) {
  const { autenticado, setAutenticado } = useContext(Contexto);
  const [autenticadoLocal, setAutenticadoLocal] = useState(false);
  const [username, setUsername] = useState();


  useEffect(() => {
    setAutenticadoLocal(autenticado);
    setUsername(Cookies.get("username"));
  }, [autenticado]);

  const handleLogOut = () => {
    Cookies.remove("access_token");
    setAutenticadoLocal(false);
    setAutenticado(false);
    setUser("");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Bienvenido a RivaLearn</h1>
          <h2>{username}</h2>
          <button className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  )
}
