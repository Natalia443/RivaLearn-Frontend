import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export function checkUserSession() {
  const user = Cookies.get("username");
  if (!user) {
    return redirect("/landing");
  }
  return null;
}
