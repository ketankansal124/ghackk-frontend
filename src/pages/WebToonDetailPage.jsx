import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWebtoonDetails, fetchUserFavorites, addFavorite } from '../api';
import { toast } from 'react-toastify'; // Import toast

const WebtoonDetailPage = () => {
    const { id } = useParams();
    const [webtoon, setWebtoon] = useState(null);
    const [userFavorites, setUserFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem('token'); // Get the token from localStorage

    useEffect(() => {
        const loadWebtoon = async () => {
            try {
                const data = await fetchWebtoonDetails(id, token); // Pass the token for auth
                setWebtoon(data);
            } catch (error) {
                console.error("Error fetching webtoon details:", error);
            }
        };

        const loadFavorites = async () => {
            if (token) { // Ensure token is available before fetching favorites
                try {
                    const favorites = await fetchUserFavorites(token);
                    setUserFavorites(favorites);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            }
        };

        loadWebtoon();
        loadFavorites();
    }, [id, token]);

    useEffect(() => {
        if (webtoon) {
            setIsFavorite(userFavorites.includes(webtoon._id));
        }
    }, [userFavorites, webtoon]);

    const handleAddFavorite = async () => {
        if (!token) {
            console.error("User is not authenticated.");
            toast.error("User is not authenticated.")
            return;
        }

        try {
            await addFavorite(webtoon._id, token);
            setUserFavorites([...userFavorites, webtoon._id]);
            setIsFavorite(true);
            toast.success("Added to Favorites!"); // Success toast
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Failed to add to Favorites."); // Error toast
        }
    };

    if (!webtoon) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{webtoon.title}</h1>
            <img
                className="w-full h-auto rounded-lg shadow-md mb-4"
                src={webtoon.thumbnail} // Updated to use the correct image source
                alt={webtoon.title}
            />
            <p className="text-lg mb-4">{webtoon.description}</p> {/* Adjusted to use description */}
            <button 
                onClick={handleAddFavorite} 
                disabled={isFavorite}
                className={`bg-blue-500 text-white py-2 px-4 rounded ${isFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default WebtoonDetailPage;
