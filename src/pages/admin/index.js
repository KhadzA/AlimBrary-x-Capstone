import { useRouter } from 'next/router';
import axios from 'axios';
import handleLogout from '../auth/logout';
import useCheckAuth from '../../helpers/checkAuth';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default function AdminDashboard() {
  useCheckAuth();
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
      <button onClick={() => handleRedirect('/admin/users/addUser')}>Add User</button>
      <br /><br />
      <button onClick={() => handleRedirect('/admin/users/viewUsers')}>View Users</button>
      <br /><br />
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
