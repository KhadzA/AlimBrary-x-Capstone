// helpers/adminUserHandler.js
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// --- FETCH ALL USERS ---
export const fetchUsers = async () => {
    await axios.get('/sanctum/csrf-cookie');
    const res = await axios.get('/users');
    return Array.isArray(res.data) ? res.data : [];
};

// --- ADD NEW USER ---
export const addUser = async (formData) => {
    await axios.get('/sanctum/csrf-cookie');
    const res = await axios.post('/user', formData, {
        headers: {
            'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
        },
    });
    return res.data;
};

// --- DELETE USER ---
export const deleteUser = async (id) => {
    await axios.get('/sanctum/csrf-cookie');
    const res = await axios.delete(`/user/${id}`, {
        headers: {
            'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
        },
    });
    return res.data;
};

// --- UPDATE USER ---
export const updateUser = async (id, updatedData) => {
    await axios.get('/sanctum/csrf-cookie');
    const res = await axios.put(`/user/${id}`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
        },
    });
    return res.data;
};
