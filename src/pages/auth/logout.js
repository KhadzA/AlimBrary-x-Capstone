import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const handleLogout = async () => {
  try {
    // 1. Fetch CSRF cookie
    await axios.get('/sanctum/csrf-cookie');

    // 2. Get the token from cookies
    const csrfToken = Cookies.get('XSRF-TOKEN');
    console.log('CSRF token used for logout:', csrfToken);

    // 3. Send logout request with token
    await axios.post(
      '/logout',
      {},
      {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
      }
    );

    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default handleLogout;
