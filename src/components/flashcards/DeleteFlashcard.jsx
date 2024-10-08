import flashcardService from "../../service/flashcardService.js";

export default function DeleteFlashcard({ flashcardId, onDelete }) {
  const handleDeleteFlashcard = async () => {
    try {
      if (window.confirm("¿Estás seguro que quieres borrar la Flashcard?")) {
        await flashcardService.deleteFlashcard(flashcardId);
        await onDelete();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button className="btn btn-danger" onClick={() => handleDeleteFlashcard()}>
      Borrar
    </button>
  );
}
