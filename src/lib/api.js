import axios from "axios";

// Une seule variable pour toutes les requêtes
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Axios configuré avec l'URL backend
const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
});

// Exemple d’appel API en fetch
export async function getJobs() {
    const res = await fetch(`${API_URL}/jobs`);
    return res.json();
}

export default api;
