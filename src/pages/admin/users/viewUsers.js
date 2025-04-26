import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import useCheckAuth from '../../../helpers/checkAuth';
import { useRouter } from 'next/router';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function ViewUsers() {
    useCheckAuth();
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
        await axios.get('/sanctum/csrf-cookie');
        fetchUsers();
        };
        init();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users');
            console.log('Fetched users:', res.data);  
            setUsers(Array.isArray(res.data) ? res.data : []);  
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };


    const handleDelete = async (id) => {
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

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditForm({
        name: user.name,
        email: user.email,
        password: '',
        });
    };

    const handleSave = async (id) => {
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

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const goHome = () => {
        router.push('/admin');
    };

    return (
        <div>
            <button onClick={goHome}>Home</button>
            <Link href="/admin/users/addUser">Add User</Link>
            <h1>View Users</h1>
            <ul>
                {users.map((user) => (
                <li key={user.id}>
                    {editingUserId === user.id ? (
                    <>
                        <input
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        />
                        <input
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        />
                        <input
                        name="password"
                        type="password"
                        value={editForm.password}
                        onChange={handleChange}
                        />
                        <button onClick={() => handleSave(user.id)}>Save</button>
                    </>
                    ) : (
                    <>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </>
                    )}
                </li>
                ))}
            </ul>
        </div>
    );
}
