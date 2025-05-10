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
  try{
    const response = await API.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (username: string, email: string, password: string, role: string) => {
  try{
    const response = await API.post("/user/register", {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async(email: string) => {
  try{
    const response = await API.post('/user/get', { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRole = async (email: string) => {
  try{
    const response = await API.post("/user/role", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await API.get("/book");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createBook = async (formData: FormData) => {
  try {
    const response = await API.post('/book', formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookPdf = async (id: string) => {
  const response = await API.get(`/book/${id}/pdf`, {
    responseType: 'blob'
  });
  const blob = await response.data;
  return URL.createObjectURL(blob);
};

export const createReading = async(user_id: string, book_id: string, curPage: number) => {
  try {
    const response = await API.post('/reading', {
      user_id,
      book_id,
      current_page: curPage
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReading = async(user_id: string, book_id: string) => {
  try {
    const response = await API.post('/reading/get', {
      user_id,
      book_id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateReading = async(user_id: string, book_id: string, curPage: number) => {
  try {
    const response = await API.put('/reading', {
      user_id,
      book_id,
      current_page: curPage
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReadings = async(user_id: string) => {
  try {
    const response = await API.get(`/reading/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};