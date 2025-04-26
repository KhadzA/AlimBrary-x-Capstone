import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// --- FETCH ALL BOOKS ---
export const fetchBooks = async () => {
  await axios.get('/sanctum/csrf-cookie');
  const res = await axios.get('/book');
  return res.data;
};

// --- ADD NEW BOOK ---
export const addBook = async (formData) => {
  await axios.get('/sanctum/csrf-cookie');
  const res = await axios.post('/book', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
    },
  });
  return res.data;
};

// --- DELETE A BOOK ---
export const deleteBook = async (id) => {
  await axios.get('/sanctum/csrf-cookie');
  const res = await axios.delete(`/book/${id}`, {
    headers: {
      'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
    },
  });
  return res.data;
};

// --- UPDATE A BOOK ---
export const updateBook = async (id, updatedData) => {
  await axios.get('/sanctum/csrf-cookie');
  const res = await axios.put(`/book/${id}`, updatedData, {
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
    },
  });
  return res.data;
};
