import SidebarComponent from './components/SidebarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';
import MapPage from './components/pages/MapPage';
import ImportPage from './components/pages/ImportPage';
import NotificationBar from './components/NotificationBar';
import { useAppContext, useContextMenuContext } from './AppContext';
import { useState } from 'react';
import Contact from '../../shared/types/Contact';
import ContactListItemContextMenu from './components/contact/contact-list/ContactListItemContextMenu';



function App() {
    

    const { message } = useAppContext();
    const { contextMenuData } = useContextMenuContext() as any;

    console.log("Version: " + process.env.REACT_APP_NAME)


    return (
        <div className="App">
            <BrowserRouter>
                <div className="sidebar">
                    <SidebarComponent />
                </div>
                <div className="main-content">
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/contact" element={<ContactsPage />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/import" element={<ImportPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="*" element={<h1>Not Found</h1>} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
            <NotificationBar message={message} />
            {contextMenuData && (
                <ContactListItemContextMenu
                    x={contextMenuData.x}
                    y={contextMenuData.y}
                    contact={contextMenuData.contact}
                />
            )}
        </div >
    );
}

export default App;
