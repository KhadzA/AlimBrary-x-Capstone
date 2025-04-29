import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { handleAddUser, handleChange } from '@/helpers/adminUserHandler';
import AddUserUI from '@/ui/admin/users/AddUserUI'; 

export default function AddUser() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

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