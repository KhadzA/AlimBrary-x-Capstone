import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import clearAuthCookies from '@/helpers/clearAuthCookies'
import SignupForm from '@/ui/auth/SignupForm'; 
import '@/ui/css/General.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    clearAuthCookies()
  }, [])

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await axios.get('/sanctum/csrf-cookie');
      const csrfToken = Cookies.get('XSRF-TOKEN');

      await axios.post(
        '/signup',
        { name, email, password },
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
    <div className="page-container">
      <SignupForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={handleSignup}
        isLoading={isLoading}
      />
    </div>
  );
}
