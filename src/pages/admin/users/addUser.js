import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { addUser } from '@/helpers/adminUserHandler';
import AddUserUI from '@/ui/admin/users/AddUserUI'; 

export default function AddUser() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await addUser(form);
            alert('User added!');
            setForm({ name: '', email: '', password: '' });
            router.push('/admin/users/viewUsers');
        } catch (err) {
            console.error(err);
            alert('Failed to add user.');
        }
    };

    const goHome = () => {
        router.push('/admin');
    };

    return (
        <AddUserUI
            form={form}
            setForm={setForm}
            goHome={goHome}
            handleChange={handleChange}
            handleAddUser={handleAddUser}
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
