import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const VistaTextos = ({ bookData }) => {
  const [bookContent, setBookContent] = useState(null);
  const [bookText, setBookText] = useState(null);

  const backendUrl = 'https://rivalearn-backend.onrender.com/api/lib/text';

  const resetBookContent = () => {
    setBookContent(null);
  };
  
  const handleBookContent = async (book) => {
    try {
      const url = book.formats['text/html'];
      const response = await axios.get(backendUrl, { params: { url } });
      const sanitizedContent = DOMPurify.sanitize(response.data);
      setBookText(sanitizedContent);
      setBookContent(book);
    } catch (error) {
      console.error('Error fetching the book content:', error);
    }
  };
  
  return (
    <div className="container">
      {bookContent ? (
        <div className="row">
          <div className="col">
            <h4>{bookContent.title ? bookContent.title : 'No hay título'}</h4>
            <div dangerouslySetInnerHTML={{ __html: bookText }} />
            <button className="btn btn-primary" onClick={resetBookContent}>Volver a seleccionar Libro</button>
          </div>
        </div>
      ) : (
        <div>
          <h4>Se encontraron {bookData.count} libros</h4>
          <div className="row">
            {bookData.results.map((book, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{book.title ? book.title : 'No hay título'}</h6>
                    <img src={book.formats['image/jpeg']} className="card-img-top" alt={book.title ? book.title : 'No hay título'} />
                    <button className="btn btn-primary mt-2" onClick={() => handleBookContent(book)}>Leer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaTextos;