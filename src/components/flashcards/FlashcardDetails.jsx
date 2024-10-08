import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import flashcardService from "../../service/flashcardService.js";
import { useFetch } from "../../hooks/useFetch.js";

export default function FlashcardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: flashcard,
    loading,
    error,
  } = useFetch(flashcardService.getFlashcardById, id);

  const handleReturn = (deckId) => {
    navigate("/flashcards", { state: { deckId } });
  };

  if (loading)
    return (
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
        <button
          className="btn btn-danger mt-3 placeholder col-4"
          disabled
        ></button>
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
            <p className="card-text text-muted">
              {flashcard.vocab_example_translated}
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-danger mt-3"
        onClick={() => handleReturn(flashcard.deck_id)}
      >
        Volver a Flashcards
      </button>
    </div>
  );
}
