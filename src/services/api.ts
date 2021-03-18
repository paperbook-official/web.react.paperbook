import axios from 'axios';

const api = axios.create({
    baseURL: 'https://appliedproject05-paperbook-api.herokuapp.com/'
});

export default api;
