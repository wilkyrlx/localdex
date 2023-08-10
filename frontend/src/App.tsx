import React from 'react';
import ContactView from './components/ContactView';
import SidebarComponent from './components/SidebarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodayPage from './components/pages/TodayPage';
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';
import MapPage from './components/pages/MapPage';
import ImportPage from './components/pages/ImportPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="sidebar">
                    <SidebarComponent />
                </div>
                <div className="main-content">
                    <main>
                        <Routes>
                            <Route path="/" element={<TodayPage />} />
                            <Route path="/contact" element={<ContactsPage />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/import" element={<ImportPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="*" element={<h1>Not Found</h1>} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </div >
    );
}

export default App;
