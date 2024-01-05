import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/notification.css';
import './styles/listItem.scss';
import './styles/interactionItem.css';
import './styles/contextMenu.css';
import App from './App';
import { AppProvider } from './AppContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);
