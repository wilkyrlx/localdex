import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

const MessageContext = createContext({
    message: "",
    setMessage: (message) => { }
});


const ContextMenuContext = createContext({
    contextMenu: null,
    setContextMenu: (context) => {},
});

const ReloadTriggerContext = createContext({
    reloadTrigger: 0,
    setReloadTrigger: (reloadTrigger) => {},
});

export function AppProvider({children}) {
    const [message, setMessage] = useState("");
    const [contextMenuData, setContextMenu] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(0);


    const messageContextValue = {
        message,
        setMessage
    };

    const contextMenuContextValue = {
        contextMenuData,
        setContextMenu
    };

    const reloadTriggerContextValue = {
        reloadTrigger,
        setReloadTrigger
    };

    return (
        <MessageContext.Provider value={messageContextValue}>
            <ContextMenuContext.Provider value={contextMenuContextValue}>
                <ReloadTriggerContext.Provider value={reloadTriggerContextValue}>
                    {children}
                </ReloadTriggerContext.Provider>
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

export const useReloadTriggerContext = () => {
    return useContext(ReloadTriggerContext);
};



