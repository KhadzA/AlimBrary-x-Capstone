// helpers/adminUserHandler.js
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// -------- ADD USER HANDLERS --------
export const handleAddUser = (form, setForm) => async (e) => {
    e.preventDefault();
    try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/user', form, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
            },
        });
        setForm({ name: '', email: '', password: '' });
        alert('User added successfully!');
    } catch (error) {
        console.error('Failed to add user:', error.response?.data || error);
    }
};

export const handleChange = (formSetter) => (e) => {
    formSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

// -------- VIEW USERS HANDLERS --------
export const fetchUsers = async (setUsers) => {
    try {
        const res = await axios.get('/users');
        console.log('Fetched users:', res.data);
        setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

export const handleDelete = (fetchUsers) => async (id) => {
    try {
        await axios.delete(`/user/${id}`, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN'))
            },
            withCredentials: true
        });
        fetchUsers();
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};

export const handleEdit = (setEditingUserId, setEditForm) => (user) => {
    setEditingUserId(user.id);
    setEditForm({
        name: user.name,
        email: user.email,
        password: '',
    });
};

export const handleSave = (editForm, setEditingUserId, fetchUsers) => async (id) => {
    try {
        await axios.put(`/user/${id}`, editForm, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(Cookies.get('XSRF-TOKEN')),
            },
        });
        setEditingUserId(null);
        fetchUsers();
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};

export const handleEditChange = (editFormSetter) => (e) => {
    editFormSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
};
