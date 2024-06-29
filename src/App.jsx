import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { LoginForm } from './components/Login';
import { Home } from './components/Home';
import { Registro } from './components/Registro';
import { Diccionario } from './components/Diccionario';
import TextosPredet from './components/TextosPredet';
import TextosPDF from './components/TextosPDF'
import Decks from './components/Decks';
import { FlashCards } from './components/FlashCards.jsx';
import DetalleFlashcard from './components/DetalleFlashcard';
import Chat from './components/Chat';
import Quiz from './components/Quiz';
import Stats from './components/Stats';
import LandingPage from './components/Landing';

function App() {
  const [user, setUser] = useState([]);

  return (
    <div className='App'>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">RivaLearn</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={!user.length ? <LoginForm setUser={setUser}/> : <Home user={user} setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Diccionario" element={<Diccionario />} />
          <Route path="/Leer" element={<TextosPredet />} />
          <Route path="/Decks" element={<Decks />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/flashcards/detail/:id" element={<DetalleFlashcard />} />
          <Route path="/LeerPDF" element={<TextosPDF />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/Landing" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

