import React, { useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Contexto } from '../context/contexto';

export function Home({ setUser }) {
  // Consumir el contexto de autenticación
  const { autenticado, setAutenticado } = useContext(Contexto);
  
  // Crear un estado local para el estado de autenticación
  const [autenticadoLocal, setAutenticadoLocal] = useState(false);

  // Establecer el valor inicial del estado local utilizando el valor del contexto de autenticación
  useEffect(() => {
    setAutenticadoLocal(autenticado);
  }, [autenticado]);

  // Función para cerrar sesión
  const handleLogOut = () => {
    // Remover el token de acceso
    Cookies.remove("access_token");
    // Cambiar el estado local a false
    setAutenticadoLocal(false);
    // Cambiar el estado del contexto a false
    setAutenticado(false);
    // Limpiar el usuario
    setUser("");
  }

  // Mostrar el valor del estado de autenticación en la consola
  console.log('Valor del estado de autenticación local:', autenticadoLocal);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Bienvenido a RivaLearn</h1>
          <h2>{autenticadoLocal ? "Usuario autenticado" : "Usuario no autenticado"}</h2>
          <button className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  )
}
