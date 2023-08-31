// StateContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({message: "test", setMessage: (message: string) => {}});

export function AppProvider ({ children }: { children: any }) {
  const [message, setMessage] = useState("");

  const contextValue = {
    message,
    setMessage
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
