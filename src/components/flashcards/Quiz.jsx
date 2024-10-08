import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import quizService from "../../service/quizService";

export default function Quiz() {
  const { flashcards } = useSelector((state) => state.flashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [successfulAttempts, setSuccessfulAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAttempt = (isSuccessful) => {
    if (!quizCompleted) {
      setTotalAttempts((prev) => {
        const newTotal = prev + 1;
        setSuccessfulAttempts((prevSuccess) => {
          const newSuccess = isSuccessful ? prevSuccess + 1 : prevSuccess;
          if (currentCardIndex === flashcards.length - 1) {
            setQuizCompleted(true);
            quizService.saveStats(successfulAttempts, totalAttempts);
          }
          return newSuccess;
        });
        return newTotal;
      });

      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setShowAnswer(false);
      }
    }
  };

  const handleAnswer = () => {
    setShowAnswer(true);
  };

  const flashcard = flashcards[currentCardIndex];

  return (
    <div className="container">
      {quizCompleted && (
        <div
          className="modal"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h2 className="modal-title text-center">Quiz Completado!</h2>
              </div>
              <div className="modal-body">
                <h4>Total: {totalAttempts}</h4>
                <h4>Aciertos: {successfulAttempts}</h4>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/Stats")}
                >
                  Ver Estadísticas Generales
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/Decks")}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card mt-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title text-uppercase">{flashcard.vocab}</h5>
            {showAnswer && (
              <p className="card-text text-muted">
                {flashcard.vocab_translated}
              </p>
            )}
          </div>
          <hr />
          <div className="text-center">
            <p className="card-text">{flashcard.vocab_example}</p>
            {showAnswer && (
              <p className="card-text text-muted">
                {flashcard.vocab_example_translated}
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-3 mx-3"
        onClick={() => handleAttempt(false)}
      >
        No lo sé
      </button>
      <button className="btn btn-primary mt-3 mx-3" onClick={handleAnswer}>
        Mostrar Respuesta
      </button>
      <button
        className="btn btn-primary mt-3 mx-3"
        onClick={() => handleAttempt(true)}
      >
        Lo sé
      </button>
    </div>
  );
}
