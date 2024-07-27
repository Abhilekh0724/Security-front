import axios from "axios";

// Creating instance of axios
const Api = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true, // Include credentials with requests
  headers: {
    "Content-Type": "application/json"
  }
});

// Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data);

// Register API
export const registerUserApi = (data) => Api.post('/api/user/create', data);

// Upload Profile Picture API
export const uploadProfilePicApi = (formData) => {
  return Api.post('/api/profile/uploadProfilePic', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Create Category API
export const createCategoryApi = (formData) => {
  return Api.post('/api/admin/create', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Fetch Categories API
export const getCategoriesApi = () => {
  return Api.get('/api/admin/get');
};

// Fetch Category by ID API
export const getCategoryByIdApi = async (id) => {
  return await Api.get(`/api/admin/get/${id}`);
};
// Search Categories API
export const searchCategoriesApi = (query) => {
  return Api.get(`/api/admin/search?q=${query}`);
};
// Get Reviews by Category API
export const getReviewsByCategoryApi = (categoryId) => {
  return Api.get(`/api/review/reviews/${categoryId}`);
};

