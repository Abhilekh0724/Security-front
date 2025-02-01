import axios from "axios";

// Function to get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Make sure to use the correct key
};

// Create instance of axios
const Api = axios.create({
  baseURL: "https://localhost:5500",
  withCredentials: true, // Include credentials with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the authorization token
Api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data);

// Logout API
export const logoutUserApi = () => Api.post('/api/user/logout');

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

// Update Category API
export const updateCategoryApi = (id, formData) => {
  return Api.put(`/api/admin/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Delete Category API
export const deleteCategoryApi = (id) => {
  return Api.delete(`/api/admin/delete/${id}`);
};

// Search Categories API
export const searchCategoriesApi = (query) => {
  return Api.get(`/api/admin/search?q=${query}`);
};

// Post Review API
export const postReviewApi = (reviewData) => {
  return Api.post('/api/review/reviews', reviewData);
};

// Get Reviews by Category API
export const getReviewsByCategoryApi = (categoryId) => {
  return Api.get(`/api/review/reviews/${categoryId}`);
};

// Create Booking API
export const createBookingApi = (bookingData) => {
  return Api.post('/api/book/book', bookingData);
};

// Get Bookings by Category API
export const getBookingsByCategoryApi = (categoryId) => {
  return Api.get(`/api/book/category/${categoryId}`);
};


// Get Bookings by User API
export const getBookingsByUserApi = () => {
  return Api.get('/api/book/bookeduser');
};

// Cancel Booking API
export const cancelBookingApi = (bookingId) => {
  return Api.patch(`/api/book/cancel/${bookingId}`);
};

// Delete Booking API
export const deleteBookingApi = (bookingId) => {
  return Api.delete(`/api/book/delete/${bookingId}`);
};

// Get All Bookings (Admin only) API
export const getAllBookingsApi = () => {
  return Api.get('/api/book/all');
};

// Create Payment API
export const createPaymentApi = (paymentData) => {
  return Api.post('/api/payment/place', paymentData);
};

// User Logs APIs
export const getUserLogsApi = (queryParams) => {
  return Api.get('/api/admin/logs', { params: queryParams });
};

export const getUserLogStatsApi = () => {
  return Api.get('/api/admin/logs/stats');
};

// Verify eSewa Payment API
export const verifyEsewaPaymentApi = (queryParams) => {
  return Api.get('/api/payment/esewa/success', { params: queryParams });
};

export const changePasswordApi = (data) => {
  return axios.post('/api/user/change-password', data);
};