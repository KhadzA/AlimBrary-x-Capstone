import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const handleLogout = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    const csrfToken = Cookies.get('XSRF-TOKEN');

    await axios.post(
      '/logout',
      {},
      {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
      }
    );

    Cookies.remove('XSRF-TOKEN', { path: '/' });
    Cookies.remove('laravel_session', { path: '/' });

    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default handleLogout;
