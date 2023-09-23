import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

// Create a context for the main app
const AppContext = createContext({
    message: "",
    setMessage: (message) => { }
});


// Create a context for the context menu
const ContextMenuContext = createContext({
    contextMenuData: null,
    setContextMenuData: (context) => {},
  });

export function AppProvider({children}) {
    const [message, setMessage] = useState("");
    const [contextMenuData, setContextMenuData] = useState(null);


    const contextValue = {
        message,
        setMessage
    };

    const contextMenuContextValue = {
        contextMenuData,
        setContextMenuData
    };

    return (
        <AppContext.Provider value={contextValue}>
            <ContextMenuContext.Provider value={contextMenuContextValue}>
                {children}
            </ContextMenuContext.Provider>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export const useContextMenuContext = () => {
    return useContext(ContextMenuContext);
};


