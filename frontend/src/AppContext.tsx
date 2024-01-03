import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { NotificationMessage } from './components/NotificationBar';

const dummyMessage = { payload: "dummy message", salt: 123 };

// Define the type for the MessageContext
interface MessageContextProps {
    message: NotificationMessage;
    setMessage: Dispatch<SetStateAction<NotificationMessage>>;
}

// Define the type for the ContextMenuContext
interface ContextMenuContextProps {
    contextMenuData: any; // Replace 'any' with the actual type of contextMenuData
    setContextMenu: Dispatch<SetStateAction<any>>;
}

// Create the MessageContext with initial values
const MessageContext = createContext<MessageContextProps>({
    message: dummyMessage,
    setMessage: () => { }, 
});


// Create the ContextMenuContext with initial values
const ContextMenuContext = createContext<ContextMenuContextProps>({
    contextMenuData: null,
    setContextMenu: () => {}, 
  });



export function AppProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<NotificationMessage>(dummyMessage);
    const [contextMenuData, setContextMenu] = useState(null);

    const messageContextValue: MessageContextProps = {
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



