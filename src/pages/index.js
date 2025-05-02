import { useEffect } from 'react';
import { useRouter } from 'next/router';
import clearAuthCookies from '@/helpers/clearAuthCookies'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    clearAuthCookies()
    router.push('/auth/login');
  }, []);

  return null; 
}
