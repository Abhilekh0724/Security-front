import axios from "axios";

// creating an instance of axios

const Api2 = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//creating test api

export const testApi2 = () => Api2.get("/test_new");
