import axios from "axios";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getBooks(lang) {
    try {
      const response = await client.get(`lib/books?code=${lang}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener libros: ${error.message}`);
    }
  },

  async getText(url) {
    try {
      const response = await client.get(`lib/text?url=${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener libros: ${error.message}`);
    }
  },
};
