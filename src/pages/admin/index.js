import { useRouter } from 'next/router';
import { useState } from 'react';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import axios from 'axios';
import handleLogout from '@/pages/auth/logout';
import AdminDashboardUI from '@/ui/admin/AdminDashboardUI';
import LogoutModal from '@/ui/auth/LogoutModal';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function AdminDashboard() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleRedirect = (path) => {
    router.push(path);
  };

  const LoadingLogout = async () => {
    setIsLoggingOut(true)
    try {
      await handleLogout()
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div>
      <AdminDashboardUI
        onRedirect={handleRedirect}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={LoadingLogout}
        isLoading={isLoggingOut}
      />
    </div>
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
