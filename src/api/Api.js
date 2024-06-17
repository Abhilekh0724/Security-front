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
