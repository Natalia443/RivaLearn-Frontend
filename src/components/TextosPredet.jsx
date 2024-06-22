import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VistaTextos from "./VistaTextos";

const TextosPredet = () => {
  const [data, setData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/lang.json')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error al cargar los lenguajes:', error));
  }, []);

  const handleReadClick = (languageCode) => {
    setIsLoading(true);
    fetch(`https://rivalearn-backend.onrender.com/api/lib/books?code=${languageCode}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('Respuesta de la API:', data);
      })
      .catch(error => console.error('Error al realizar la solicitud a la API:', error));
  };

  const handleResetClick = () => {
    setData(null);
    setIsLoading(false);
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
          {isLoading && ( 
            <div className="progress my-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}></div>
            </div>
          )}
          <div className="row">
            {languages.map((language) => (
              <div key={language.code} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">{language.name}</h5>
                    <hr/>
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