import React, { useState, useCallback } from "react";
import dictionaryService from "../service/dictionaryService.js";
import LanguageDropdowns from "./lang/LangDropdown.jsx";

export default function Dictionary() {
  const [language, setLanguage] = useState("en");
  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [error, setError] = useState(null);

  const handleLanguageChange = useCallback((e) => {
    setLanguage(e.target.value);
  }, []);

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const search = async () => {
    const newDefinitions = await dictionaryService.search(word, language);
    if (newDefinitions) {
      setDefinitions(newDefinitions);
      setError(null);
    } else {
      setDefinitions([]);
      setError("La palabra no fue encontrada en el diccionario");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center my-5">
      <div>
        <h1>Buscador de Diccionario</h1>
        <LanguageDropdowns
          isTranslate={false}
          selectedLanguage={language}
          handleLanguageChange={handleLanguageChange}
        />
        <div>
          <label htmlFor="word">Palabra:</label>
          <input
            className="form-control mb-3"
            type="text"
            id="word"
            value={word}
            onChange={handleWordChange}
          />
        </div>
        <button className="btn btn-primary" onClick={search}>
          Buscar
        </button>
        <hr className="border border-danger border-2 opacity-50"></hr>
        {error && <p>{error}</p>}
        <ul className="list-group">
          {definitions.map((definition, index) => (
            <li className="list-group-item" key={index}>
              {definition}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
