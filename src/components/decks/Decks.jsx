import deckService from "../../service/deckService.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlaceHolder from "./Placeholder.jsx";
import CreateDeck from "./CreateDeck.jsx";
import DeleteDeck from "./DeleteDeck.jsx";
import UpdateDeck from "./UpdateDeck.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import { setDeckData } from "../../store/deckSlice.js";

export default function UserDecks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: decks,
    loading,
    error,
    refetch,
  } = useFetch(deckService.getUserDecks);

  const redirectSelectedDeckData = (deckId, deckName) => {
    dispatch(setDeckData({ deckId, deckName }));
    navigate("/flashcards");
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex flex-column">
        <CreateDeck onCreate={refetch} />
        <PlaceHolder />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid d-flex flex-column">
      <CreateDeck onCreate={refetch} />
      <div className="row flex-grow-1">
        {decks.map((deck, index) => (
          <div key={deck.deck_id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{deck.name}</h5>
                <hr />
                <div className="mt-auto">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      redirectSelectedDeckData(deck.deck_id, deck.name)
                    }
                  >
                    Acceder al deck
                  </button>
                  <button
                    className="btn btn-secondary mx-3"
                    style={{ bottom: "15px", right: "10px" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                  >
                    Editar
                  </button>
                  <DeleteDeck deckId={deck.deck_id} onDelete={refetch} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <UpdateDeck decks={decks} onUpdate={refetch} />
    </div>
  );
}
