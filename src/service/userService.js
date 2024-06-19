import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/",
  /*baseURL: "http://localhost:3001/api/",*/
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async saveUser(username, password, email) {
    try {
      const user = await client.post("users/signup", { username, password, email });
      return user;
    } catch (error) {
      throw "Error al guardar el usuario";
    }
  },

  async login(usernameInput, passwordInput) {
    try {
      const response = await client.post("users/login", {
        username: usernameInput,
        password: passwordInput,
      });
      const { access_token, refresh_token, username, user_id } = response.data;
      Cookies.set("access_token", access_token, { expires: 1 / 24 });
      Cookies.set("refresh_token", refresh_token, { expires: 7 });
      Cookies.set("username", username);
      Cookies.set("user_id", user_id);
      return { username: username };
    } catch (error) {
      throw "Error al iniciar sesion";
    }
  },

  async getUserDecks() {
    try {
      const user_id = Cookies.get("user_id");
      if (!user_id) {
        throw "No se encontró el user_id en las cookies";
      }
      const response = await client.get(`decks/get/${user_id}`);
      return response.data;
    } catch (error) {
      throw "Error al obtener los decks del usuario";
    }
  },

  async createDeck(deckName) {
    try {
      const user_id = Cookies.get("user_id");
      if (!user_id) {
        throw "No se encontró el user_id en las cookies";
      }
      const response = await client.post(`decks/create`, {
        userId: user_id,
        deckname: deckName,
      });
      return response.data;
    } catch (error) {
      throw "Error al crear el deck";
    }
  },

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
    throw new Error(`Error al obtener los detalles de la flashcard: ${error.message}`);
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

async deleteDeck(deckId) {
  try {
    const response = await client.delete(`decks/delete/${deckId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al borrar la Flashcard: ${error.message}`);
  }
}


};

