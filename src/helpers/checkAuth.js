import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function useCheckAuth() {
    const router = useRouter();
    
    //This is where it authoorizes the users and check if they're logged in or not
    useEffect(() => {
        const checkAuth = async () => {
        try {
            await axios.get('/user'); 
        } catch (error) {
            console.error('Not authenticated, redirecting...');
            router.push('/auth/login'); 
        }
        };

        checkAuth();
    }, [router]);
}
