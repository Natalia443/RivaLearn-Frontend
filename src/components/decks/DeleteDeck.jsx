import deckService from "../../service/deckService.js";

export default function DeleteDeck({ deckId, onDelete }) {
  const handleDeleteDeck = async () => {
    try {
      if (
        window.confirm(
          "¿Estás seguro que quieres borrar el deck? Se eliminaran consigo todas las flashcards que el deck contenga"
        )
      ) {
        await deckService.deleteDeck(deckId);
        await onDelete();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button
      className="btn btn-danger"
      style={{ bottom: "15px", right: "10px" }}
      onClick={() => handleDeleteDeck()}
    >
      Borrar
    </button>
  );
}
