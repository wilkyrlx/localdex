import SidebarComponent from './components/SidebarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';
import MapPage from './components/pages/MapPage';
import ImportPage from './components/pages/ImportPage';
import NotificationBar from './components/NotificationBar';
import { useAppContext } from './AppContext';



function App() {
    const { message } = useAppContext();

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
        </div >
    );
}

export default App;
