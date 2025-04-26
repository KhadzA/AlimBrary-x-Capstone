import { useRouter } from 'next/router';
import handleLogout from '../auth/logout';
import useCheckAuth from '../../../helpers/checkAuth';

export default function UserDashboard() {
  useCheckAuth();
  const router = useRouter();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => router.push('/user/books/viewBooks')}>
          View Books
        </button>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
