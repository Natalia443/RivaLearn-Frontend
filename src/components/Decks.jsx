import React, { useEffect, useState } from "react";
import userService from "../service/userService.js"; 
import { useNavigate } from "react-router-dom";


export function UserDecks(){
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDeckName, setNewDeckName] = useState(null);
  const navigate = useNavigate();

  const fetchDecks = async () => {
    try {
      const userDecks = await userService.getUserDecks();
      setDecks(userDecks);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

 /* const handleAccessDeck = (deckId) =>{
    navigate('/flashcards', { state : { deck_id : deckId }})
  } */

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!newDeckName) {
      alert("El nombre del deck no puede estar vacío");
      return;
    }
    try {
      const newDeck = await userService.createDeck(newDeckName);
      setDecks([...decks, newDeck]);
      setNewDeckName("");
      fetchDecks();
    } catch (error) {
      alert("Error al crear el deck");
    }
  };


  useEffect(() => {
    fetchDecks();
  }, []);

  if (loading) return <div>Loading...</div>;
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
          <button type="submit" className="btn btn-primary mx1">+</button>
        </form>
      </div>
      <div className="row flex-grow-1">
        {decks.map(deck => (
          <div key={deck.deck_id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{deck.name}</h5>
                <div className="mt-auto">
                  <button className="btn btn-primary"
                  /*onClick={handleAccessDeck(deck.deck_id)}*/
                  >
                    Acceder al deck</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDecks;
