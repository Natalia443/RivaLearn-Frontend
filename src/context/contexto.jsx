import React, { createContext, useState } from 'react';

const Contexto = createContext();

const Proveedor = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <Contexto.Provider value={{ autenticado, setAutenticado }}>
      {children}
    </Contexto.Provider>
  );
};

export { Contexto, Proveedor };
