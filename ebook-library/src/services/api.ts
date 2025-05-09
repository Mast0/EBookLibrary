import axios from "axios";
import { cursorTo } from "readline";

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

export const getUserByEmail = async(email: string) => {
  const response = await API.post('/user/get', { email });
  return response.data;
};

export const getRole = async (email: string) => {
  const response = await API.post("/user/role", { email });
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

export const getBookPdf = async (id: string) => {
  const response = await API.get(`/book/${id}/pdf`, {
    responseType: 'blob'
  });
  const blob = await response.data;
  return URL.createObjectURL(blob);
};

export const createReading = async(user_id: string, book_id: string, curPage: number) => {
  const response = await API.post('/reading', {
    user_id,
    book_id,
    current_page: curPage
  });
  return response.data;
};

export const getReading = async(user_id: string, book_id: string) => {
  const response = await API.post('/reading/get', {
    user_id,
    book_id
  });
  return response.data;
};

export const updateReading = async(user_id: string, book_id: string, curPage: number) => {
  const response = await API.put('/reading', {
    user_id,
    book_id,
    current_page: curPage
  });
  return response.data;
};