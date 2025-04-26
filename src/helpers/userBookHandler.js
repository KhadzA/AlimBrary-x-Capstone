import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export const fetchBooks = async () => {
  await axios.get('/sanctum/csrf-cookie'); // Always refresh CSRF
  const res = await axios.get('/book');
  return res.data;
};
