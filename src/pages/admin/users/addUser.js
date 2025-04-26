import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import useCheckAuth from '../../../helpers/checkAuth';
import { useRouter } from 'next/router';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function AddUser() {
    useCheckAuth();
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
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

    const goHome = () => {
        router.push('/admin');
    };

    return (
        <div>
            <button onClick={goHome}>Home</button>
            <Link href="/admin/users/viewUsers">View Users</Link>
            <h1>Add User</h1>
            <form onSubmit={handleAddUser}>
                <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                />
                <input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                />
                <input
                name="password"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}
