import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import flashcardService from '../service/flashcardService.js';

const DetalleFlashcard = () => {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const fetchedFlashcard = await flashcardService.getFlashcardById(id);
        setFlashcard(fetchedFlashcard);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleVolverFlashcards = (deckId) =>{
    navigate('/flashcards', { state : { deckId } });
  };

  if (loading) return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text text-muted placeholder-glow">
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <hr />
          <div className="text-center">
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
            </p>
            <p className="card-text text-muted placeholder-glow">
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      </div>
      <button className="btn btn-danger mt-3 placeholder col-4" disabled></button>
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title text-uppercase">{flashcard.vocab}</h5>
            <p className="card-text text-muted">{flashcard.vocab_translated}</p>
          </div>
          <hr />
          <div className="text-center">
            <p className="card-text">{flashcard.vocab_example}</p>
            <p className="card-text text-muted">{flashcard.vocab_example_translated}</p>
          </div>
        </div>
      </div>
      <button className="btn btn-danger mt-3" onClick={() => handleVolverFlashcards(flashcard.deck_id)}>
        Volver a Flashcards
      </button>
    </div>
  );
};

export default DetalleFlashcard;
