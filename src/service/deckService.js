import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  //baseURL: "https://rivalearn-backend.onrender.com/api/",
  baseURL: "http://localhost:3001/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
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

  async deleteDeck(deckId) {
    try {
      const response = await client.delete(`decks/delete/${deckId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al borrar el deck: ${error.message}`);
    }
  },

  async updateDeck(id, name) {
    try {
      const response = await client.put("decks/update", {
        deckId: id,
        deckName: name,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error al editar el deck: ${error.message}`);
    }
  },
};
