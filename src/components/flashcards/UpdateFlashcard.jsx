import React, { useState, useEffect } from "react";
import flashcardService from "../../service/flashcardService.js";
import LanguageDropdowns from "../lang/LangDropdown.jsx";

export default function UpdateFlashcard({
  index,
  flashcardId,
  flashcardVocab,
  flashcardVocabExample,
  onUpdate,
}) {
  const [editFlashcardId, setEditFlashcardId] = useState("");
  const [editVocab, setEditVocab] = useState("");
  const [editVocabExample, setEditVocabExample] = useState("");
  const [editSourceLang, setEditSourceLang] = useState("en");
  const [editTargetLang, setEditTargetLang] = useState("es");

  useEffect(() => {
    setEditFlashcardId(flashcardId || "");
    setEditVocab(flashcardVocab || "");
    setEditVocabExample(flashcardVocabExample || "");
  }, [flashcardId, flashcardVocab, flashcardVocabExample]);
  const handleUpdateFlashcard = async (e) => {
    e.preventDefault();
    try {
      await flashcardService.updateFlashcard(
        editFlashcardId,
        editVocab,
        editVocabExample,
        editSourceLang,
        editTargetLang
      );
      await onUpdate();
    } catch (error) {
      alert("Error al editar la flashcard");
    }
  };

  return (
    <div
      className="modal fade"
      id={`exampleModal${index}`}
      tabIndex="-1"
      aria-labelledby={`exampleModalLabel${index}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`exampleModalLabel${index}`}>
              Editar Flashcard
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdateFlashcard}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="editVocab"
                  value={editVocab}
                  onChange={(e) => setEditVocab(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="editVocabExample"
                  value={editVocabExample}
                  onChange={(e) => setEditVocabExample(e.target.value)}
                />
              </div>
              <div className="d-flex flex-grow-1">
                <LanguageDropdowns
                  selectedLanguage={editSourceLang}
                  selectedTranslation={editTargetLang}
                  handleLanguageChange={(e) =>
                    setEditSourceLang(e.target.value)
                  }
                  handleTranslationChange={(e) =>
                    setEditTargetLang(e.target.value)
                  }
                />
              </div>
              <div className="modal-footer my-2">
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
