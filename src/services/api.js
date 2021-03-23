import axios from 'axios'

//https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&redirects&titles=Rick%20e%20Morty
const api = axios.create({
    baseURL:"https://pt.wikipedia.org/w/api.php",
    params:{
        action:'query',
        origin:'*',
        prop:'extracts',
        exintro:true,
        format:'json',
        redirects:true
    }
});

export default api;