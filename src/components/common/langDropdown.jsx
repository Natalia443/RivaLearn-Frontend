import React, { useState, useEffect } from 'react';

const LanguageDropdowns = ({ selectedLanguage, selectedTranslation, handleLanguageChange, handleTranslationChange }) => {
  const [languages, setLanguages] = useState([]);
  const [traduccion, setTraduccion] = useState([]);

  useEffect(() => {
    fetch('/lang.json')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error al cargar los lenguajes:', error));
    fetch('/lang2.json')
      .then(response => response.json())
      .then(data2 => setTraduccion(data2))
      .catch(error => console.error('Error al cargar las traducciones:', error));
  }, []);

  return (
    <div className="d-flex">
      <select 
        className="form-select me-2" 
        style={{ width: 'auto' }}
        value={selectedLanguage || ""}
        onChange={handleLanguageChange}
      >
        <option value="" disabled>Idioma</option>
        {languages.map((idioma, index) => (
          <option key={index} value={idioma.code}>
            {idioma.name}
          </option>
        ))}
      </select>

      <select 
        className="form-select me-2" 
        style={{ width: 'auto' }}
        value={selectedTranslation || ""}
        onChange={handleTranslationChange}
      >
        <option value="" disabled>Traducción</option>
        {traduccion.map((traduccion, index) => (
          <option key={index} value={traduccion.code}>
            {traduccion.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdowns;
