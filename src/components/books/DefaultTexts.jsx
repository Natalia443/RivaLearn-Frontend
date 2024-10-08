import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextView from "./TextView";
import ProgressBar from "../ProgressBar";
import bookService from "../../service/bookService";
import sourceLang from "../lang/sourceLang";

export default function DefaultTexts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReadClick = async (languageCode) => {
    setIsLoading(true);
    const books = await bookService.getBooks(languageCode);
    setData(books);
  };

  const handleResetClick = () => {
    setData(null);
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      {data ? (
        <>
          <TextView bookData={data} />
          <button className="btn btn-secondary mt-3" onClick={handleResetClick}>
            Volver a seleccionar Lenguaje
          </button>
        </>
      ) : (
        <>
          <h1 className="mb-4">Selecciona un idioma para leer</h1>
          <ProgressBar isLoading={isLoading} />
          <div className="row">
            {sourceLang.map((language) => (
              <div key={language.code} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">{language.name}</h5>
                    <hr />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReadClick(language.code)}
                    >
                      Leer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
