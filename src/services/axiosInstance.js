import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add headers, authentication tokens, etc. here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can transform the response here
    return response.data;
  },
  (error) => {
    // Handle global errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
