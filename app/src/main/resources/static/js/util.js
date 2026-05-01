// util.js
const Util = {
    // Save data to localStorage
    saveToStorage: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    
    // Get data from localStorage
    getFromStorage: (key) => JSON.parse(localStorage.getItem(key)),

    // Helper to handle API Fetch with Tokens
    async secureFetch(url, options = {}) {
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
        return fetch(url, { ...options, headers });
    }
};