import React, { useState } from "react";
import deckService from "../../service/deckService.js";

export default function CreateDeck({ onCreate }) {
  const [newDeckName, setNewDeckName] = useState("");

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!newDeckName) {
      alert("El nombre del deck no puede estar vacío");
      return;
    }
    try {
      await deckService.createDeck(newDeckName);
      setNewDeckName("");
      await onCreate();
    } catch (error) {
      alert("Error al crear el deck");
    }
  };

  return (
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
        <button type="submit" className="btn btn-primary mx-1">
          +
        </button>
      </form>
    </div>
  );
}
