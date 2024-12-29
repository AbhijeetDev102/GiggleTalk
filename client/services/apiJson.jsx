import axios from 'axios';

const apiJson = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request interceptor to add Authorization header
apiJson.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Fetch token inside interceptor
        if (token) {
            const cleanToken = token.replace(/"/g, '');
            config.headers['Authorization'] = `Bearer ${cleanToken}`;
        }
        return config;
    },
    (error) => {
        console.log("Failed to set token in request");
        return Promise.reject(error);
    }
);

// Add response interceptor to handle invalid or expired tokens
apiJson.interceptors.response.use(
    (response) => {
        // If the request is successful, simply return the response
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle expired or invalid token
            console.error("Token is invalid or expired. Please log in again.");
            // Optionally: Redirect to login page or refresh token logic
        }
        return Promise.reject(error);
    }
);

const apiUrl = import.meta.env.VITE_BASE_URL;

export { apiJson, apiUrl };
