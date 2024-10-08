import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useInput(serviceFn, username, password, errorMessage, email) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [error, setErrorMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res =
        email !== undefined
          ? await serviceFn(username, password, email)
          : await serviceFn(username, password);
      setUser(res);
      navigate("/");
    } catch (error) {
      setErrorMessage(errorMessage);
    }
  };

  return {
    user,
    error,
    submit,
  };
}
