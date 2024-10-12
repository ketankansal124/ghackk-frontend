// components/WebtoonDetail.jsx
import React from 'react';

const WebtoonDetail = ({ webtoon }) => {
    if (!webtoon) {
        return <div className="text-center">Webtoon not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{webtoon.title}</h2>
            <img
                src={webtoon.thumbnail}
                alt={webtoon.title}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <p className="text-gray-700 mb-4">{webtoon.description}</p>
        </div>
    );
};

export default WebtoonDetail;
