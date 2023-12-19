import SidebarComponent from './components/SidebarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';
import MapPage from './components/pages/MapPage';
import ImportPage from './components/pages/ImportPage';
import NotificationBar from './components/NotificationBar';
import { useMessageContext, useContextMenuContext } from './AppContext';
import ContactListItemContextMenu from './components/contact/contact-list/ContactListItemContextMenu';
import NetworkPage from './components/pages/NetworkPage';
import dataManager from './util/DataManager';



function App() {
    
    const { message } = useMessageContext();
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
                            <Route path='/network' element={<NetworkPage />} />
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
