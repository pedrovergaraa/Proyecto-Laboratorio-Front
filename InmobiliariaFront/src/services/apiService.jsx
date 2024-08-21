// src/services/ApiService.js

const API_URL = 'http://localhost:8080';

const handleResponse = (response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const ApiService = {
    getAll: (endpoint) => {
        return fetch(`${API_URL}/${endpoint}`)
            .then(handleResponse)
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                throw error;
            });
    }
};

export default ApiService;
