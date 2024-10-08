import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import homeData from "./homeData.js";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(Cookies.get("username"));
  });

  const handleLogOut = () => {
    Cookies.remove("access_token");
    Cookies.remove("username");
    Cookies.remove("password");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="col-md-6">
          <h1>Bienvenido a RivaLearn, {username}</h1>
        </div>
      </div>

      <div className="row g-0">
        {homeData.map((option) => (
          <div
            key={option.name}
            className="card mb-3 mx-4"
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={option.img}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{option.name}</h5>
                  <p className="card-text">{option.summary}</p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(option.navigate)}
                  >
                    Acceder
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-danger my-2" onClick={handleLogOut}>
        Cerrar sesión
      </button>
    </div>
  );
}
