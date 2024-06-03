import React, { useEffect, useState, useCallback } from "react";
import userService from "../service/userService.js"; 
import { useLocation } from 'react-router-dom';



export  function FlashCards() {
    const [flashcards, setFlashcards] = useState([]);
    const [languages, setLanguages] = useState([]);
    const { state  } = useLocation();
    const deckId = state ? state.deckId : null;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedTranslation, setSelectedTranslation] = useState('');
    const [word, setWord] = useState('');

    
    const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
    };

    const handleTranslationChange = (e) => {
      setSelectedTranslation(e.target.value);
    };

    const handleWordChange = (e) => {
      setWord(e.target.value);
    };

    const handleSubmit = (deckId) => {
      handleCreateFlashcard(deckId,  word, selectedLanguage, selectedTranslation);
      setWord("");
      setSelectedLanguage("");
      setSelectedTranslation("");
    };

    const fetchFlashCards = useCallback(async () => {
        try {
          const decksFlashcards = await userService.getDeckFlashCards(deckId);
          setFlashcards(decksFlashcards);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
    }, [deckId]);

    const handleCreateFlashcard = async (deckId, palabra, idioma, traduccion) => {
      if (!deckId || !palabra || !idioma || !traduccion ) {
        alert("Complete todos los datos");
        return;
      }
      try {
        const newFlashcard = await userService.createFlashcard(deckId, palabra, idioma, traduccion);
        setFlashcards([...flashcards, newFlashcard]);
        fetchFlashCards();
      } catch (error) {
        alert("Error al crear la flashcard");
      }
    };
  

    useEffect(() => {
      fetch('/lang.json')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error al cargar los lenguajes:', error));
      fetchFlashCards();
    }, [fetchFlashCards]);
  
    return (
      <div className="container">
      <div className="d-flex justify-content-end mb-4 mt-2">
        <select 
        className="form-select me-2" 
        style={{ width: 'auto' }}
        value={selectedLanguage !== null ? selectedLanguage : ""}
        onChange={handleLanguageChange}
        >
        <option value="" disabled >Idioma</option>
          {languages.map((idioma, index) => (
            <option key={index} value={idioma.code}>
              {idioma.name}
            </option>
          ))}
        </select>
        <select 
        className="form-select me-2" 
        style={{ width: 'auto' }}
        value={selectedTranslation !== null ? selectedTranslation : ""}
        onChange={handleTranslationChange}>
        <option value="" disabled >Traduccion</option>
          {languages.map((traduccion, index) => (
            <option key={index} value={traduccion.code}>
              {traduccion.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Palabra"
          style={{ width: 'auto' }}
          value={word !== null ? word : ""}
          onChange={handleWordChange}
        />
        <button 
        type="submit" 
        className="btn btn-primary"
        onClick={() => handleSubmit(deckId)}>
          +
        </button>
      </div>
      <div className="row flex-grow-1" style={{ marginLeft: '-0.5rem' }}>
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="col-md-4 mb-3">
            <div className="card" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{flashcard.vocab}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      );
}

export default FlashCards;
