import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://ghackk-backend.onrender.com/api'; // Ensure the correct API URL is set

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const res = await axios.get(`${API_URL}/favorites`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the headers
                    },
                });
                setFavorites(res.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setError('Failed to fetch favorites. Please try again later.'); // Set error message
                toast.error("Failed to fetch favorites. Please try again later.");
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFromFavorites = async (webtoonId) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            await axios.delete(`${API_URL}/favorites/${webtoonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the headers
                },
            });

            // Update the favorites state
            setFavorites(favorites.filter((webtoon) => webtoon._id !== webtoonId));
            toast.success("Webtoon removed from favorites!"); // Success toast
        } catch (error) {
            console.error('Error removing from favorites:', error);
            toast.error("Failed to remove webtoon from favorites."); // Error toast
        }
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>; // Error state
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Your Favorite Webtoons</h2>
            {favorites.length === 0 ? ( // Check if there are no favorites
                <p className="text-gray-500">You have no favorite webtoons yet.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((webtoon) => (
                        <li key={webtoon._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold mb-2">{webtoon.title}</h3>
                            <img
                                className="w-full h-auto rounded-md"
                                src={webtoon.thumbnail}
                                alt={webtoon.title}
                            />
                            <button 
                                onClick={() => handleRemoveFromFavorites(webtoon._id)} 
                                className="mt-2 w-full bg-red-600 text-white py-1 rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Remove from Favorites
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favourites;
