import { useRouter } from 'next/router';
import { useState } from 'react';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import handleLogout from '@/auth/logout';
import UserDashboardUI from '@/ui/user/UserDashboardUI';
import LogoutModal from '@/ui/auth/LogoutModal';

export default function UserDashboard() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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
      <UserDashboardUI
        onViewBooks={() => router.push('/user/books/viewBooks')}
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