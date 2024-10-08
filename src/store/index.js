import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./deckSlice";
import flashcardSlice from "./flashcardSlice";

const store = configureStore({
  reducer: { deck: deckSlice.reducer, flashcards: flashcardSlice.reducer },
});

export default store;
