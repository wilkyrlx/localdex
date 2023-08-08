import React from 'react';
import ContactView from './components/ContactView';
import SidebarComponent from './components/SidebarComponent';

function App() {
    return (
        <div className="App">
            <div className="sidebar">
                <SidebarComponent />
            </div>
            <div className="main-content">
                <main>
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                    <ContactView />
                </main>
            </div>
        </div>
    );
}

export default App;
