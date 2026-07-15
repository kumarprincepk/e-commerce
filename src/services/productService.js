import apiClient from './axiosInstance';

export const ProductService = {
  // Get all products (or a large batch)
  getAllProducts: () => {
    return apiClient.get('/products?limit=0');
  },
  
  // Get all categories
  getCategories: () => {
    return apiClient.get('/products/categories');
  },

  // Get products by category
  getProductsByCategory: (category) => {
    return apiClient.get(`/products/category/${category}`);
  },
  
  // Get a single product by ID
  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },
};
