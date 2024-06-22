import axios from "axios";

const client = axios.create({
  //baseURL: "https://rivalearn-backend.onrender.com/api/",
  baseURL: "http://localhost:3001/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getDeckFlashCards(deckId) {
    try {
      if (!deckId) {
        throw new Error("No se encontró el deckId");
      }

      const response = await client.get(`flashcards/get/${deckId}`);

      if (response.status !== 200) {
        throw new Error("Error en la solicitud de flashcards");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los flashcards: ${error.message}`);
    }
  },

  async createFlashcard(deckId, palabra, idioma, traduccion) {
    try {
      const response = await client.post(`flashcards/create`, {
        deckId: deckId,
        vocab: palabra,
        sourceLang: idioma,
        targetLang: traduccion,
      });
      return response.data;
    } catch (error) {
      throw "Error al crear la flashcard";
    }
  },

  async getFlashcardById(flashcardId) {
    try {
      const response = await client.get(`flashcards/detail/${flashcardId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error al obtener los detalles de la flashcard: ${error.message}`
      );
    }
  },

  async createStory(words) {
    try {
      const response = await client.post("gemini/story", { words });
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear la historia: ${error.message}`);
    }
  },

  async deleteFlashcard(flashcardId) {
    try {
      const response = await client.delete(`flashcards/delete/${flashcardId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al borrar la Flashcard: ${error.message}`);
    }
  },

  async updateFlashcard(
    flashcardId,
    vocab,
    vocabExample,
    sourceLang,
    targetLang
  ) {
    try {
      const response = await client.put("flashcards/update", {
        flashcardId: flashcardId,
        vocab: vocab,
        vocabExample: vocabExample,
        sourceLang: sourceLang,
        targetLang: targetLang,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error al editar la Flashcard: ${error.message}`);
    }
  },
};
