// Create instance of Axios
// const axios = require('axios');
import axios from "axios";

const API_fetchUsers = axios.create({
    baseURL: "https://api.github.com",
});

const API_search = axios.create({
    baseURL: "https://api.github.com/search",
});

// module.exports = API;
export {API_fetchUsers, API_search};