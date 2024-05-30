import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';



export  function FlashCards() {
    const [flashcards, setFlashcards] = useState([]);
    const { state } = useLocation();
    const { deck_id } = state;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFlashCards = async () => {
        try {
          const decksFlashcards = await userService.getDeckFlashCards(deck_id);
          setFlashcards(decksFlashcards);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchFlashCards();
      }, []);
    
  return (
    <div>
        <div className="row flex-grow-1">
        {flashcards.map(flashcards => (
          <div key={flashcards.flashcards_id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{flashcards.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlashCards;
