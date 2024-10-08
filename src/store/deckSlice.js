import { createSlice } from "@reduxjs/toolkit";

const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deckId: "",
    deckName: "",
  },
  reducers: {
    setDeckData(state, action) {
      state.deckId = action.payload.deckId;
      state.deckName = action.payload.deckName;
    },
  },
});

export const { setDeckData } = deckSlice.actions;
export default deckSlice;
