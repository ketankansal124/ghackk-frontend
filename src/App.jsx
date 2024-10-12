// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WebtoonDetailPage from './pages/WebToonDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Favourites from './components/Favourites';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/webtoon/:id" element={<WebtoonDetailPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/favorites" element={<Favourites />} />
                    </Routes>
                </main>
                <ToastContainer 
                    position="top-right" // Position of the toast notifications
                    autoClose={5000} // Duration in milliseconds before toast disappears
                    hideProgressBar={false} // Show or hide progress bar
                    newestOnTop={false} // If true, newer toasts will appear on top
                    closeOnClick // Allow users to close the toast by clicking on it
                    pauseOnHover // Pause when hovering over the toast
                    draggable // Allow users to drag the toast
                    pauseOnFocusLoss // Pause when the window loses focus
                />
            </div>
        </Router>
    );
};

export default App;
