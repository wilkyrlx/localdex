import React from 'react';
import ContactView from './components/ContactView';
import SidebarComponent from './components/SidebarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';

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
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                        <ContactView />
                    </main>
                </div>
            </BrowserRouter>
        </div >
    );
}

export default App;
