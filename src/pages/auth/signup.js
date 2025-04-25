import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {

      await axios.get('/sanctum/csrf-cookie'); 

      const csrfToken = Cookies.get('XSRF-TOKEN');

    await axios.post(
      '/signup',
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken), 
        },
      }
    );

      router.push('/auth/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <br />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <br />
        <button type="submit">Sign Up</button>
            <br />
        <Link href="/auth/login">Login</Link>
    </form>
  );
}
