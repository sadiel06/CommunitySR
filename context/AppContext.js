import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [user, setUser] = useState({
    idUsuario: null,
    userName: null,
    password: null,
    IdPersona: null,
    NumeroCuenta: null,
    idStatusUsuario: null,
    IsClient: null,
    isAdmin: null,
    Permisos: null,
    cantPermisos: null,
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
