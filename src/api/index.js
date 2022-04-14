import axios from "axios";

const API_search = axios.create({
    baseURL: "https://api.github.com/search",
});


export {API_search};