import React, { useState, useEffect } from "react";
import deckService from "../service/deckService.js";
import { useNavigate } from "react-router-dom";

export function UserDecks() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDeckName, setNewDeckName] = useState(null);
  const [updatedDeckName, setUpdatedDeckName] = useState(null);
  const navigate = useNavigate();

  const fetchDecks = async () => {
    try {
      const userDecks = await deckService.getUserDecks();
      setDecks(userDecks);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccessFlashCard = (deckId, deckName) => {
    navigate('/flashcards', { state: { deckId, deckName } });
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!newDeckName) {
      alert("El nombre del deck no puede estar vacío");
      return;
    }
    try {
      const newDeck = await deckService.createDeck(newDeckName);
      setDecks([...decks, newDeck]);
      setNewDeckName("");
      fetchDecks();
    } catch (error) {
      alert("Error al crear el deck");
    }
  };

  const handleDeleteDeck = async (deckId) => {
    try {
      if (window.confirm('¿Estás seguro que quieres borrar el deck? Se eliminaran consigo todas las flashcards que el deck contenga')) {
        await deckService.deleteDeck(deckId);
        await fetchDecks();
      } else {}
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateDeck = async (e, deckId) => {
    e.preventDefault();
    try {
      await deckService.updateDeck(deckId, updatedDeckName);
      await fetchDecks();
      setUpdatedDeckName("");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Mis Decks</h1>
          <form className="d-flex" onSubmit={handleCreateDeck}>
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Nombre nuevo deck"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mx-1">+</button>
          </form>
        </div>
        <div className="row flex-grow-1">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card placeholder-glow">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <div className="mt-auto">
                    <button className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></button>
                    <button
                      className="btn btn-danger position-absolute placeholder col-4"
                      style={{ bottom: '15px', right: '10px' }}
                      aria-disabled="true"></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Mis Decks</h1>
        <form className="d-flex" onSubmit={handleCreateDeck}>
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Nombre nuevo deck"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mx-1">+</button>
        </form>
      </div>
      <div className="row flex-grow-1">
        {decks.map((deck, index) => (
          <div key={deck.deck_id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{deck.name}</h5>
                <hr />
                <div className="mt-auto">
                  <button className="btn btn-primary"
                    onClick={() => handleAccessFlashCard(deck.deck_id, deck.name)}>
                    Acceder al deck
                  </button>
                  <button
                    className="btn btn-secondary mx-3"
                    style={{ bottom: '15px', right: '10px' }}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}>
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ bottom: '15px', right: '10px' }}
                    onClick={() => handleDeleteDeck(deck.deck_id)}>
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {decks.map((deck, index) => (
        <div
          key={deck.deck_id}
          className="modal fade"
          id={`exampleModal${index}`}
          tabIndex="-1"
          aria-labelledby={`exampleModalLabel${index}`}
          aria-hidden="true"
        >
        <form onSubmit={(e) => handleUpdateDeck(e, deck.deck_id)}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`exampleModalLabel${index}`}>
                  Editar nombre del deck "{deck.name}"
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
            
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Nombre"
              value={updatedDeckName}
              onChange={(e) => setUpdatedDeckName(e.target.value)}
              required
            />
              </div>
              <div className="modal-footer">
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
        
      ))}
    </div>
  );
}

export default UserDecks;
