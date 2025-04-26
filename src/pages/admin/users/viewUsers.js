import { useState, useEffect } from 'react';
import { fetchUsers, handleDelete, handleEdit, handleSave, handleEditChange } from '../../../helpers/adminUserHandler';
import useCheckAuth from '../../../helpers/checkAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ViewUsers() {
    useCheckAuth();
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            await fetchUsers(setUsers);
        };
        init();
    }, []);

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
                                    onChange={handleEditChange(setEditForm)}
                                />
                                <input
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleEditChange(setEditForm)}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    value={editForm.password}
                                    onChange={handleEditChange(setEditForm)}
                                />
                                <button onClick={() => handleSave(editForm, setEditingUserId, () => fetchUsers(setUsers))(user.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <strong>Name:</strong> {user.name} <br />
                                <strong>Email:</strong> {user.email} <br />
                                <button onClick={() => handleEdit(setEditingUserId, setEditForm)(user)}>Edit</button>
                                <button onClick={() => handleDelete(() => fetchUsers(setUsers))(user.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
