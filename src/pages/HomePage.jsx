import React, { useEffect, useState } from 'react';
import { fetchWebtoons } from '../api';
import WebtoonList from '../components/WebToonList';
import { toast } from 'react-toastify'; // Import toast

const HomePage = () => {
    const [webtoons, setWebtoons] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const loadWebtoons = async () => {
            setLoading(true); // Set loading to true before fetching
            toast.info('Loading webtoons...'); // Show loading toast
            try {
                const data = await fetchWebtoons();
                setWebtoons(data);
                toast.success('Webtoons fetched successfully!'); // Success toast
            } catch (error) {
                console.error('Error fetching webtoons:', error);
                setError('Failed to fetch webtoons. Please try again later.'); // Set error message
                toast.error('Failed to fetch webtoons. Please try again later.'); // Error toast
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        loadWebtoons();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>; // Loading message
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>; // Error message
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Popular Webtoons</h1>
            {webtoons.length > 0 ? (
                <WebtoonList webtoons={webtoons} />
            ) : (
                <div className="text-center">No webtoons available at the moment.</div> // Empty state message
            )}
        </div>
    );
};

export default HomePage;
