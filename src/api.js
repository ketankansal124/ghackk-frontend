import axios from 'axios';

const API_URL = 'https://ghackk-backend.onrender.com/api';  // Use your backend URL

// Fetch list of webtoons
export const fetchWebtoons = async () => {
    const response = await axios.get(`${API_URL}/webtoons`);
    return response.data;
};

// Fetch details of a single webtoon
export const fetchWebtoonDetails = async (id) => {
    const response = await axios.get(`${API_URL}/webtoons/${id}`);
    return response.data;
};

// Fetch favorite webtoons for a logged-in user
export const fetchUserFavorites = async (token) => {
    const response = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map(webtoon => webtoon._id); // Return an array of webtoon IDs
};

// User registration
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

// User login
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

// Add a webtoon to favorites
export const addFavorite = async (webtoonId, token) => {
    const response = await axios.post(
        `${API_URL}/favorites`,
        { webtoonId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

// Remove a webtoon from favorites
export const removeFavorite = async (webtoonId, token) => {
    const response = await axios.delete(
        `${API_URL}/favorites/${webtoonId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
