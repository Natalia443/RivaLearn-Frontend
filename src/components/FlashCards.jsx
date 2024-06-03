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
        <select className="form-select me-2" style={{ width: 'auto' }}>
        <option value="" disabled selected>Idioma</option>
          {languages.map((idioma, index) => (
            <option key={index} value={idioma.code}>
              {idioma.name}
            </option>
          ))}
        </select>
        <select className="form-select me-2" style={{ width: 'auto' }}>
        <option value="" disabled selected>Traduccion</option>
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
        />
        <button type="submit" className="btn btn-primary">
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
