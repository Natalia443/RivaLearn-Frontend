import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { LoginForm } from './components/Login';
import { Home } from './components/Home';
import { Registro } from './components/Registro';
import { Diccionario } from './components/Diccionario';
import TextosPredet from './components/TextosPredet';

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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/Diccionario" className="nav-link">Diccionario</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Leer" className="nav-link">Leer</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>      
          <Route path="/" element={!user.length ? <LoginForm setUser={setUser}/> : <Home user={user} setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Diccionario" element={<Diccionario />} />
          <Route path="/Leer" element={<TextosPredet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
