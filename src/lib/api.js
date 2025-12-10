import axios from "axios";

// Une seule variable pour toutes les requêtes
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Axios configuré avec l'URL backend
const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
});

export default api;
