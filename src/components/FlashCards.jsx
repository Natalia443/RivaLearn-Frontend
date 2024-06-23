import React, { useEffect, useState, useCallback } from "react";
import flashcardService from "../service/flashcardService.js"; 
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ProgressBar from "./common/loading"; 
import LanguageDropdowns from "./common/langDropdown"; 


export function FlashCards() {
  const [flashcards, setFlashcards] = useState([]);
  const { state } = useLocation();
  const deckId = state ? state.deckId : null;
  const deckName = state ? state.deckName : null;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTranslation, setSelectedTranslation] = useState('');
  const [word, setWord] = useState('');
  const [historia, setHistoria] = useState(null);
  const [editFlashcardId, setEditFlashcardId] = useState(null);
  const [editVocab, setEditVocab] = useState('');
  const [editVocabExample, setEditVocabExample] = useState('');
  const [editSourceLang, setEditSourceLang] = useState('');
  const [editTargetLang, setEditTargetLang] = useState('');
  const navigate = useNavigate();

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
    setIsLoading(false);
    setHistoria(null);
  };

  const handleCrearHistoria = async (flashcards) => {
    setIsLoading(true);
    try {
      const story = await flashcardService.createStory(flashcards);
      setHistoria(story);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      if (window.confirm('¿Estás seguro que quieres borrar la Flashcard?')) {
        await flashcardService.deleteFlashcard(flashcardId);
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
      await handleCreateFlashcard(deckId, word, selectedLanguage, selectedTranslation);
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
      const decksFlashcards = await flashcardService.getDeckFlashCards(deckId);
      setFlashcards(decksFlashcards);
    } catch (error) {
      console.error("Error al obtener flashcards:", error);
    }
  }, [deckId]);

  const handleCreateFlashcard = async (deckId, palabra, idioma, traduccion) => {
    if (!deckId || !palabra || !idioma || !traduccion) {
      alert("Complete todos los datos");
      return;
    }
    try {
      const newFlashcard = await flashcardService.createFlashcard(deckId, palabra, idioma, traduccion);
      setFlashcards([...flashcards, newFlashcard]);
      fetchFlashCards();
    } catch (error) {
      alert("Error al crear la flashcard");
    }
  };

  const handleUpdateFlashcard = async (e, flashcardId) => {
    e.preventDefault();
    try {
      await flashcardService.updateFlashcard(flashcardId, editVocab, editVocabExample, editSourceLang, editTargetLang);
      await fetchFlashCards();
      setEditVocab('');
      setEditVocabExample('');
      setEditSourceLang('');
      setEditTargetLang('');
      setEditFlashcardId(null);
    } catch (error) {
      alert("Error al editar la flashcard");
    }
  };

  useEffect(() => {
    fetchFlashCards();
  }, [fetchFlashCards]);

  return (
    <div className="container">
      {historia ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ maxWidth: '800px' }}>
            <p style={{ fontSize: '1.5rem' }}>"{historia}"</p>
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
              <LanguageDropdowns
                selectedLanguage={selectedLanguage}
                selectedTranslation={selectedTranslation}
                handleLanguageChange={handleLanguageChange}
                handleTranslationChange={handleTranslationChange}
              />
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
          <ProgressBar isLoading={isLoading} />
          <div className="row flex-grow-1">
            {flashcards.map((flashcard, index) => (
              <div key={flashcard.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{flashcard.vocab}</h5>
                    <hr/>
                    <div className="mt-auto">
                      <Link to={`/flashcards/detail/${flashcard.id}`} className="btn btn-primary me-2">
                        Detalles
                      </Link>
                      <button
                        className="btn btn-secondary mx-3"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal${index}`}
                        onClick={() => {
                          setEditFlashcardId(flashcard.id);
                          setEditVocab(flashcard.vocab);
                          setEditVocabExample(flashcard.vocab_example);
                          setEditSourceLang(flashcard.source_lang);
                          setEditTargetLang(flashcard.target_lang);
                        }}>
                        Editar
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteFlashcard(flashcard.id)}>
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  key={flashcard.id}
                  className="modal fade"
                  id={`exampleModal${index}`}
                  tabIndex="-1"
                  aria-labelledby={`exampleModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel${index}`}>
                          Editar Flashcard
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={(e) => handleUpdateFlashcard(e, flashcard.id)}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="editVocab"
                              value={editVocab}
                              onChange={(e) => setEditVocab(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="editVocabExample"
                              value={editVocabExample}
                              onChange={(e) => setEditVocabExample(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-grow-1">
                            <LanguageDropdowns
                              selectedLanguage={editSourceLang}
                              selectedTranslation={editTargetLang}
                              handleLanguageChange={(e) => setEditSourceLang(e.target.value)}
                              handleTranslationChange={(e) => setEditTargetLang(e.target.value)}
                            />
                          </div>                                 
                          <div className="modal-footer my-2">
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                              Guardar  
                            </button>    
                          </div>      
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
          <button className="btn btn-danger" onClick={() => navigate('/Decks')}>Volver a decks</button>
        </div>
      )}
    </div>
  );
}
