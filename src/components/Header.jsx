import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 text-white">
            <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/">Webtoon Library</Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link className="hover:text-gray-300" to="/">Home</Link>
                    </li>
                    {!token ? (
                        <>
                            <li>
                                <Link className="hover:text-gray-300" to="/login">Login</Link>
                            </li>
                            <li>
                                <Link className="hover:text-gray-300" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="hover:text-gray-300" to="/favorites">Favorites</Link>
                            </li>
                            <li>
                                <button 
                                    className="hover:text-gray-300" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
