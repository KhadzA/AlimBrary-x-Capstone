import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { checkRoleAndRedirect } from '@/helpers/checkRole';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await axios.get('/sanctum/csrf-cookie');
    const csrfToken = Cookies.get('XSRF-TOKEN');

    await axios.post(
      '/login',
      { email, password },
      {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
      }
    );

    // Now check role and redirect
    checkRoleAndRedirect(router);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <form onSubmit={handleLogin}>
      <h1>Log In</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit">Login</button>
      <br />
      <Link href="/auth/signup">Signup</Link>
    </form>
  );
}
