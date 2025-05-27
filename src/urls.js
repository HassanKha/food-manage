import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const ImageURL = "https://upskilling-egypt.com:3006/"

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
export const RECEPIE_URLS = {
    GET_RECEPIES: `/Recipe/`,
    DELETE_RECEPIE: (ID) => `/Recipe/${ID}`,
    CREATE_RECEPIE:`/Recipe/`,
};

export const TAGS_URLS = {
    GET_TAGS: `/tag/`,
};
