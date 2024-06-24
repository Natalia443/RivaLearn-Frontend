import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/",
  //baseURL: "http://localhost:3001/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async saveStats(success, total) {
    try {
      const user_id = Cookies.get("user_id");
      const response = await client.post("quiz/stats", {
        userId: user_id,
        success: success,
        total: total,
      });
      return response.data;
    } catch (error) {
      throw "Error al guardar las estadísticas";
    }
  },

  async getStats() {
    try {
      const user_id = Cookies.get("user_id");
      const response = await client.get(`quiz/get/${user_id}`);
      return response.data;
    } catch (error) {
      throw "Error al guardar las estadísticas";
    }
  },
};
