import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (email: string, password: string) => {
  const response = await API.post("/user/login", { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string, role: string) => {
  const response = await API.post("/user/register", {
    username,
    email,
    password,
    role,
  });
  return response.data;
};

export const getBooks = async () => {
  const response = await API.get("/book");
  return response.data;
};

export const createBook = async (formData: FormData) => {
  const response = await API.post('/book', formData);
  return response.data;
};