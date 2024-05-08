import axios from "axios";

const client = axios.create({
  baseURL: "https://rivalearn-backend.onrender.com/api/users",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async saveUser(username, password, email) {
    try {
      const user = await client.post("/signup", { username, password, email });
      return user;
    } catch (error) {
      throw "Error al guardar el usuario";
    }
  },
};
