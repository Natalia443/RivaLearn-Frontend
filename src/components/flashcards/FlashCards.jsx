import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, Outlet } from "react-router-dom";
import flashcardService from "../../service/flashcardService.js";
import UpdateFlashcard from "./UpdateFlashcard.jsx";
import DeleteFlashcard from "./DeleteFlashcard.jsx";
import CreateFlashcard from "./CreateFlashcard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setFlashcards } from "../../store/flashcardSlice.js";
import { useFetch } from "../../hooks/useFetch.js";

export default function FlashCards() {
  const { deckId, deckName } = useSelector((state) => state.deck);
  const [selectedFlashcard, setSelectedFlashcard] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: flashcards, refetch } = useFetch(
    flashcardService.getDeckFlashCards,
    deckId
  );

  useEffect(() => {
    if (flashcards) {
      dispatch(setFlashcards(flashcards));
    }
  }, [flashcards, dispatch]);

  const handleQuiz = async () => {
    if (!flashcards || flashcards.length === 0) {
      alert("Aún no tienes flashcards");
      return;
    }
    navigate("/flashcards/quiz");
  };

  const isChildRoute =
    useLocation().pathname.includes("detail") ||
    useLocation().pathname.includes("story") ||
    useLocation().pathname.includes("quiz");

  return (
    <div className="container">
      {!isChildRoute ? (
        <>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h2>{deckName}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <Link to={`/flashcards/story`} className="btn btn-primary me-2">
              Crear Historia
            </Link>
            <button
              className="btn btn-success ms-3"
              style={{ bottom: "15px", right: "10px" }}
              onClick={handleQuiz}
            >
              Practicar
            </button>
            <CreateFlashcard deckId={deckId} onCreate={refetch} />
          </div>
          <div className="row flex-grow-1">
            {flashcards.map((flashcard, index) => (
              <div key={flashcard.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{flashcard.vocab}</h5>
                    <hr />
                    <div className="mt-auto">
                      <Link
                        to={`/flashcards/detail/${flashcard.id}`}
                        className="btn btn-primary me-2"
                      >
                        Detalles
                      </Link>
                      <button
                        className="btn btn-secondary mx-3"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal${index}`}
                        onClick={() => {
                          setSelectedFlashcard(flashcard);
                        }}
                      >
                        Editar
                      </button>
                      <DeleteFlashcard
                        flashcardId={flashcard.id}
                        onDelete={refetch}
                      />
                    </div>
                  </div>
                </div>
                <UpdateFlashcard
                  index={index}
                  flashcardId={selectedFlashcard.id}
                  flashcardVocab={selectedFlashcard.vocab}
                  flashcardVocabExample={selectedFlashcard.vocab_example}
                  onUpdate={refetch}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-danger" onClick={() => navigate("/Decks")}>
            Volver a decks
          </button>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
