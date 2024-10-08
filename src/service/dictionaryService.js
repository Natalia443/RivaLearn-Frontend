import axios from "axios";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async search(word, language) {
    try {
      const response = await client.get(
        `dict/meaning?text=${word}&language=${language}`
      );
      const data = response.data;

      if (data.results && data.results.length > 0) {
        const results = data.results || [];
        const newDefinitions = results.reduce((acc, result) => {
          const senses = result.senses || [];
          const resultDefinitions = senses.map((sense) => sense.definition);
          return [...acc, ...resultDefinitions];
        }, []);
        return newDefinitions;
      }
    } catch (error) {
      throw new Error(
        `Error al obtener definición del diccionario: ${error.message}`
      );
    }
  },
};
