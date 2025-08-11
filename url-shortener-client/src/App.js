import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortener from './UrlShortener';
import Admin from './Admin';
import './App.css'; // Ensure you import your CSS

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UrlShortener />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
