import flashcardService from "../../service/flashcardService.js";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import { useSelector } from "react-redux";

export default function Stories() {
  const { flashcards } = useSelector((state) => state.flashcards);
  const navigate = useNavigate();

  function fetchStory() {
    if (!flashcards || flashcards.length === 0) {
      alert("Aún no tienes flashcards");
      return;
    }
  }

  fetchStory();
  const {
    data: generatedStory,
    setData: setGeneratedStory,
    loading: isLoading,
  } = useFetch(flashcardService.createStory, flashcards);

  function handleGoBack() {
    setGeneratedStory(null);
    navigate("/Decks");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="my-2">
        {isLoading ? (
          <ProgressBar isLoading={isLoading} />
        ) : (
          <p style={{ fontSize: "1.5rem" }}>"{generatedStory}"</p>
        )}

        <button type="button" className="btn btn-danger" onClick={handleGoBack}>
          Volver Atrás
        </button>
      </div>
    </div>
  );
}
