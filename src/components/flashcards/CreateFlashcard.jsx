import React, { useState } from "react";
import flashcardService from "../../service/flashcardService.js";
import LanguageDropdowns from "../lang/LangDropdown.jsx";

export default function CreateFlashcard({ deckId, onCreate }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [word, setWord] = useState("");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleTranslationChange = (e) => {
    setSelectedTranslation(e.target.value);
  };

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };
  const handleSubmit = async (deckId) => {
    try {
      if (!deckId || !word || !selectedLanguage || !selectedTranslation) {
        alert("Complete todos los datos");
        return;
      }
      await handleCreateFlashcard(word, selectedLanguage, selectedTranslation);
      setWord("");
      setSelectedLanguage("");
      setSelectedTranslation("");
      if (onCreate) {
        onCreate();
      }
    } catch (error) {
      console.error("Error al manejar el envío del formulario:", error);
      alert("Error al crear la flashcard");
    }
  };

  const handleCreateFlashcard = async (palabra, idioma, traduccion) => {
    if (!deckId || !palabra || !idioma || !traduccion) {
      alert("Complete todos los datos");
      return;
    }
    try {
      await flashcardService.createFlashcard(
        deckId,
        palabra,
        idioma,
        traduccion
      );
      await onCreate();
    } catch (error) {
      alert("Error al crear la flashcard");
    }
  };

  return (
    <div className="d-flex">
      <LanguageDropdowns
        selectedLanguage={selectedLanguage}
        selectedTranslation={selectedTranslation}
        handleLanguageChange={handleLanguageChange}
        handleTranslationChange={handleTranslationChange}
      />
      <input
        type="text"
        className="form-control me-2"
        placeholder="Palabra"
        style={{ width: "auto" }}
        value={word || ""}
        onChange={handleWordChange}
      />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => handleSubmit(deckId)}
      >
        +
      </button>
    </div>
  );
}
