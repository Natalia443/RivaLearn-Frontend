import axios from "axios";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/",
  //baseURL: "http://localhost:3001/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async chat(message, history) {
    try {
      const formattedHistory = this.createHistory(history);
      const response = await client.post(`gemini/chat`, {
        prompt: message,
        history: formattedHistory,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al enviar el mensaje");
    }
  },

  createHistory(history) {
    return history.map((msg) => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.message }],
    }));
  },
};
