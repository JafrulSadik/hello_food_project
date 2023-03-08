import axios from "axios";

// const BASE_URL = "https://hello-food-lsz7.onrender.com/api/";
const BASE_URL = "https://admin-hellofood.hellofood.com.bd/api";
// const BASE_URL = "http://localhost:5000/api/";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
