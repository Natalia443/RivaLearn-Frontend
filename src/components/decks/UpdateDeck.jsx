import React, { useState } from "react";
import deckService from "../../service/deckService.js";

export default function UpdateDeck({ decks, onUpdate }) {
  const [updatedDeckName, setUpdatedDeckName] = useState("");

  const handleUpdateDeck = async (e, deckId) => {
    e.preventDefault();
    try {
      await deckService.updateDeck(deckId, updatedDeckName);
      await onUpdate();
      setUpdatedDeckName("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
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
                  <h1
                    className="modal-title fs-5"
                    id={`exampleModalLabel${index}`}
                  >
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
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}
