import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import React from 'react';
import { LoginForm } from './components/Login';
import { Home } from './components/Home';
import { Registro } from './components/Registro';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState([])

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
                  {/* <Link to="/registro" className="nav-link">Registro</Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>      
          <Route path="/" element={!user.length > 0 ? <LoginForm setUser={setUser}/> : <Home user={user} setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
