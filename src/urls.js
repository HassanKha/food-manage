import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  FORGET_PASS: `/Users/Reset/Request`,
  RESET_PASS: `/Users/Reset`,
};

export const CATEGORIES_URLS = {
    GET_CATEGORIES: `/Category/`,
    DELETE_CATEGORY: (ID) => `/Category/${ID}`
};
