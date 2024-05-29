import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Proveedor } from './context/contexto.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Proveedor>
      <App />
    </Proveedor>
  </React.StrictMode>,
);
