import { useState } from 'react';
import { handleAddUser, handleChange } from '../../../helpers/adminUserHandler';
import useCheckAuth from '../../../helpers/checkAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddUser() {
    useCheckAuth();
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const goHome = () => {
        router.push('/admin');
    };

    return (
        <div>
            <button onClick={goHome}>Home</button>
            <Link href="/admin/users/viewUsers">View Users</Link>
            <h1>Add User</h1>
            <form onSubmit={handleAddUser(form, setForm)}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange(setForm)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange(setForm)}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange(setForm)}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}
