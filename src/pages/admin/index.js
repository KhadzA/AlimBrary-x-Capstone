import { useRouter } from 'next/router';
import handleLogout from '../auth/logout';

export default function AdminDashboard() {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => handleRedirect('/admin/books/addBook')}>Add Book</button>
      <br /><br />
      <button onClick={() => handleRedirect('/admin/books/viewBooks')}>View Books</button>
      <br /><br />
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
