import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { fetchUsers, deleteUser, updateUser } from '@/helpers/adminUserHandler';
import ViewUsersUI from '@/ui/admin/users/ViewUsersUI'; 

export default function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        init();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        const data = await fetchUsers();
        setUsers(data);
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setEditForm({
            name: user.name,
            email: user.email,
            password: '', // Password intentionally blank
        });
    };

    const handleSave = async (id) => {
        await updateUser(id, editForm);
        setEditingUserId(null);
        const data = await fetchUsers();
        setUsers(data);
    };

    const goHome = () => {
        router.push('/admin');
    };

    return (
        <ViewUsersUI
            users={users}
            editingUserId={editingUserId}
            editForm={editForm}
            setEditForm={setEditForm}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSave={handleSave}
            goHome={goHome}
        />
    );
}

export async function getServerSideProps(context) {
    const auth = await checkAuthServer(context);

    if (!auth.authenticated) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    return { props: {} };
}
