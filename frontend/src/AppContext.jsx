import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

// TODO: include some changing aspect so even if the context is the same, it will still re-render
const MessageContext = createContext({
    message: "",
    setMessage: (message) => { }
});


const ContextMenuContext = createContext({
    contextMenu: null,
    setContextMenu: (context) => {},
});

export function AppProvider({children}) {
    const [message, setMessage] = useState("");
    const [contextMenuData, setContextMenu] = useState(null);

    const messageContextValue = {
        message,
        setMessage
    };

    const contextMenuContextValue = {
        contextMenuData,
        setContextMenu
    };



    return (
        <MessageContext.Provider value={messageContextValue}>
            <ContextMenuContext.Provider value={contextMenuContextValue}>
                    {children}
            </ContextMenuContext.Provider>
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    return useContext(MessageContext);
};

export const useContextMenuContext = () => {
    return useContext(ContextMenuContext);
};



