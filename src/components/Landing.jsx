import React, { useState, useEffect } from 'react';
import logo from '../assets/LOGO.png'; 
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const [faq, setFaq] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('/faq.json')
      .then(response => response.json())
      .then(data => setFaq(data))
      .catch(error => console.error('Error al cargar las preguntas:', error));
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: '#35aad1', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="row align-items-center hero-section">
        <div className="col-md-6">
          <h1 className="display-4 mb-4">RivaLearn</h1>
          <h3 className="lead mb-4">Aprende idiomas de forma eficiente y divertida.</h3>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => window.location.href = "https://github.com/Natalia443/RivaLearn-Mobile"}
          >
            Descargar para Android
          </button>
        </div>
        <div className="col-md-6">
          <img src={logo} alt="Hero" className="img-fluid" />
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-4">
          <div className="card" style={{ backgroundColor: '#35aad1', color: 'white', borderColor: 'white' }}>
            <div className="card-body">
              <h3 className="card-title">Aprendé leyendo</h3>
              <hr/>
              <h5 className="card-text">Leé textos de dominio público adecuados para estudiantes principiantes o subí textos PDF más adaptados a tus necesidades.</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ backgroundColor: '#35aad1', color: 'white', borderColor: 'white'}}>
            <div className="card-body">
              <h3 className="card-title">Inteligencia Artificial</h3>
              <hr/>
              <h5 className="card-text">Generá historias con las palabras de tus decks o chateá con una Inteligencia Artificial en el idioma que quieras aprender.</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ backgroundColor: '#35aad1', color: 'white', borderColor: 'white' }}>
            <div className="card-body">
              <h3 className="card-title">Decks</h3>
              <hr/>
              <h5 className="card-text">Creá decks, guardá flashcards, practicá y obtené un feedback instantáneo con nuestras estadísticas.</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center my-5">
        <div className="col-md-6 text-center">
          <h2 className="mb-4">¿Listo para potenciar tu aprendizaje?</h2>
          <p className="lead mb-4">Registrate ahora mismo para comenzar a estudiar y disfrutar de todos nuestros beneficios.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/registro")}>Crear cuenta</button>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div className="row  flex-grow-1" style={{ backgroundColor: '#212121', color: 'white', padding: '20px' }}>
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
          <div className="accordion" id="faqAccordion" style={{
            '--bs-accordion-btn-color': '#35aad1',
            '--bs-accordion-btn-bg': '#212121',
            '--bs-accordion-active-color': '#212121',
            '--bs-accordion-active-bg': '#35aad1',
            '--bs-accordion-border-color': '#35aad1', 
            }}>
            {faq.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header" id={`faqHeading${index}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faqCollapse${index}`} aria-expanded="false" aria-controls={`faqCollapse${index}`}>
                    {item.question}
                  </button>
                </h3>
                <div id={`faqCollapse${index}`} className="accordion-collapse collapse" aria-labelledby={`faqHeading${index}`} data-bs-parent="#faqAccordion">
                  <div className="accordion-body" style={{ backgroundColor: '#212121', color: 'white' }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-center py-3" >
        <div className="container">
          <p className="mb-0">&copy; 2024 RivaLearn. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}; 

export default LandingPage;
