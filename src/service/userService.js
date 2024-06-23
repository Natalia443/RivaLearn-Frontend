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
  async saveUser(username, password, email) {
    try {
      const user = await client.post("users/signup", {
        username,
        password,
        email,
      });
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
      const { access_token, refresh_token, expiry_date, username, user_id } =
        response.data;
      const expiryDate = new Date(expiry_date);
      Cookies.set("access_token", access_token, { expires: 1 / 24 });
      Cookies.set("refresh_token", refresh_token, { expires: expiryDate });
      Cookies.set("username", username);
      Cookies.set("user_id", user_id);
      return { username: username };
    } catch (error) {
      throw error.message;
    }
  },
};
