import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // your backend URL
    withCredentials: true, // if you use auth later
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
