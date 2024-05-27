import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VistaTextos from "./VistaTextos";

const TextosPredet = () => {
  const [data, setData] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Cargar el JSON de lenguajes
    fetch('/lang.json')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error al cargar los lenguajes:', error));
  }, []);

  const handleReadClick = (languageCode) => {
    // Realiza una solicitud a la API con el código del lenguaje seleccionado
    fetch(`https://gutendex.com/books/?topic=children&languages=${languageCode}`, {
      method: 'GET', // Puedes ajustar el método HTTP según sea necesario
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta de la API aquí
        setData(data);
        console.log('Respuesta de la API:', data);
      })
      .catch(error => console.error('Error al realizar la solicitud a la API:', error));
  };

  const handleResetClick = () => {
    setData(null);
  };

  return (
    <div className="container mt-5">
      {data ? (
        <>
          <VistaTextos bookData={data} />
          <button className="btn btn-secondary mt-3" onClick={handleResetClick}>Volver a seleccionar Lenguaje</button>
        </>
      ) : (
        <>
          <h1 className="mb-4">Selecciona un idioma para leer</h1>
          <div className="row">
            {languages.map((language) => (
              <div key={language.code} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">{language.name}</h5>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleReadClick(language.code)}
                    >
                      Leer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TextosPredet;