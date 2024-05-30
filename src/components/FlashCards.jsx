import React, { useEffect, useState, useCallback } from "react";
import userService from "../service/userService.js"; 
import { useLocation } from 'react-router-dom';



export  function FlashCards() {
    const [flashcards, setFlashcards] = useState([]);
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
      fetchFlashCards();
    }, [fetchFlashCards]);
  
  return (
    <div>
        <div className="row flex-grow-1">
        {flashcards.map(flashcards => (
          <div key={flashcards.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{flashcards.vocab}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlashCards;
