import axios from 'axios';
// https://sujeitoprogramador.com/r-api/?api=filmes

const api = axios.create({
    baseURL: 'https://{{OrgURL}}.my.salesforce.com/',
});

export default api;