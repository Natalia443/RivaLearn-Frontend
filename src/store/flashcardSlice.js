import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: {
    flashcards: [],
  },
  reducers: {
    setFlashcards(state, action) {
      state.flashcards = action.payload;
    },
  },
});

export const { setFlashcards } = flashcardSlice.actions;
export default flashcardSlice;
