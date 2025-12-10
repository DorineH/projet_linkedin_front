// import axios from 'axios'


// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000',
//     timeout: 15000,
// })


// export default api

// api.js
const API_URL = import.meta.env.VITE_API_URL;

export async function getJobs() {
    const res = await fetch(`${API_URL}/`);
    return res.json();
}
