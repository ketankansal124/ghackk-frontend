// components/WebtoonList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WebtoonList = ({ webtoons }) => {
    if (webtoons.length === 0) {
        return <p className="text-center">No webtoons available.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Popular Webtoons</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {webtoons.map((webtoon) => (
                    <li 
                        key={webtoon._id} 
                        className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Link to={`/webtoon/${webtoon._id}`} className="block p-4">
                            <img 
                                src={webtoon.thumbnail} 
                                alt={webtoon.title} 
                                className="w-full h-48 object-cover mb-2 rounded"
                            />
                            <h3 className="text-lg font-semibold">{webtoon.title}</h3>
                            <p className="text-gray-600">{webtoon.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebtoonList;
