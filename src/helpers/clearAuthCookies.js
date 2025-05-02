// helpers/clearAuthCookies.js
import Cookies from 'js-cookie'
import axios from 'axios'

const clearAuthCookies = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')
    const csrfToken = Cookies.get('XSRF-TOKEN')

    await axios.post(
      '/logout',
      {},
      {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
      }
    )
  } catch (err) {
    console.warn('Logout from server failed:', err)
  }

  Cookies.remove('XSRF-TOKEN', { path: '/' })
  Cookies.remove('laravel_session', { path: '/' })
}

export default clearAuthCookies
