import React, { useEffect, useState, useCallback } from "react";
import userService from "../service/userService.js"; 
import { useLocation, Link } from 'react-router-dom';


export  function FlashCards() {
    const [flashcards, setFlashcards] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [traduccion, setTraduccion] = useState([]);
    const { state  } = useLocation();
    const deckId = state ? state.deckId : null;
    const deckName = state ? state.deckName : null;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedTranslation, setSelectedTranslation] = useState('');
    const [word, setWord] = useState('');
    const [historia, setHistoria] = useState(null);

    
    const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
    };

    const handleTranslationChange = (e) => {
      setSelectedTranslation(e.target.value);
    };

    const handleWordChange = (e) => {
      setWord(e.target.value);
    };

    const handleGoBack = () => {
      setHistoria(null);
    };

    
  const handleCrearHistoria = async (flashcards) => {
    try {
      const story = await userService.createStory(flashcards);
      setHistoria(story);
      console.log("Historia creada:", story);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      if (window.confirm('¿Estás seguro que quieres borrar la Flashcard?')) {
        await userService.deleteFlashcard(flashcardId);
        await fetchFlashCards();
      } else {} 
    } catch (error) {
      console.error(error.message);
    }
  };



    const handleSubmit = async (deckId) => {
      try {
        if (!deckId || !word || !selectedLanguage || !selectedTranslation) {
          alert("Complete todos los datos");
          return;
        }
        await handleCreateFlashcard(deckId,  word, selectedLanguage, selectedTranslation);
        setWord("");
        setSelectedLanguage("");
        setSelectedTranslation("");
        await fetchFlashCards();
      } catch (error) {
        console.error("Error al manejar el envío del formulario:", error);
        alert("Error al crear la flashcard");
      }
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
      fetch('/lang2.json')
      .then(response => response.json())
      .then(data2 => setTraduccion(data2))
      .catch(error => console.error('Error al cargar los lenguajes:', error));
      fetchFlashCards();
    }, [fetchFlashCards]);
  
    return (
    <div className="container">
    {historia ? (
      <div style={{ width: '100%' }}>
       <p style={{ fontSize: '1.5rem' }}>{historia}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={handleGoBack}>
            Volver Atrás
          </button>
        </div>
      </div>
    ) : (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h2>{deckName}</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
        <button 
          type="button" 
          className="btn btn-primary me-2" 
          onClick={() => handleCrearHistoria(flashcards)}>
          Crear Historia
        </button>
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
          <input
            type="text"
            className="form-control me-2"
            placeholder="Palabra"
            style={{ width: 'auto' }}
            value={word || ""}
            onChange={handleWordChange}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            onClick={() => handleSubmit(deckId)}>
            +
          </button>
        </div>
      </div>
      <div className="row flex-grow-1" style={{ marginLeft: '-0.5rem' }}>
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="col-md-4 mb-3">
            <div className="card" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{flashcard.vocab}</h5>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Link to={`/flashcards/detail/${flashcard.id}`} className="btn btn-secondary">Detalles</Link>
                </div>
              </div>
              <button 
                className="btn btn-danger position-absolute" 
                style={{ bottom: '16px', right: '10px' }}
                onClick={() => handleDeleteFlashcard(flashcard.id)}>
                  Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
      );
}

export default FlashCards;
