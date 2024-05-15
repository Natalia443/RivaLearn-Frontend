import React, { useState } from 'react';

export function Diccionario(){
  const [language, setLanguage] = useState('en'); 
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [error, setError] = useState(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };


  const search = () => {
      const apiUrl = `https://rivalearn-backend.onrender.com/api/dict/meaning?text=${word}&language=${language}`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al buscar la palabra en el diccionario');
          }
          return response.json();
        })
        .then(data => {
          if (data.results && data.results.length > 0) {
            const results = data.results || [];
            const newDefinitions = results.reduce((acc, result) => {
              const senses = result.senses || [];
              const resultDefinitions = senses.map(sense => sense.definition);
              return [...acc, ...resultDefinitions];
            }, []);
        
            setDefinitions(newDefinitions);
            setError(null);
          } else {
            setDefinitions([]);
            setError('La palabra no fue encontrada en el diccionario');
          }
        })
        .catch(error => {
          console.error('Error de solicitud:', error);
          setDefinitions([]);
          setError('Error al cargar los datos');
        });
  
    
  };

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
    <div>
      <h1>Buscador de Diccionario</h1>
      <div>
        <label htmlFor="language">Idioma:</label>
        <select className ="form-select" aria-label="Default select example" id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="fr">Français</option>
          <option value="pr">Portugues</option>
        </select>
      </div>
      <div>
        <label htmlFor="word">Palabra:</label>
        <input  className="form-control mb-3" type="text" id="word" value={word} onChange={handleWordChange} />
      </div>
      <button className="btn btn-primary" onClick={search}>Buscar</button>
      {error && <p>{error}</p>}
      <ul>
          {definitions.map((definition, index) => (
            <li key={index}>{definition}</li>
          ))}
        </ul>
    </div>
    </section>
  );
};

export default Diccionario;
