import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { Formulario } from './components/Formulario';
import { Home } from './components/Home';
import { Registro } from './components/Registro';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState([])

  return (
    <div className='App'>
      <Router>
        <Routes>      
          <Route path="/" 
          element={
          !user.length > 0
          ?  <Formulario setUser={setUser}/>
          :<Home user={user} setUser={setUser} />
          } />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
  
    </div>
    
  );
}

export default App;
