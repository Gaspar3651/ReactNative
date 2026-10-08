import axios from 'axios';
// https://sujeitoprogramador.com/r-api/?api=filmes

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SF_SCRT_URL,
});

export default api;
