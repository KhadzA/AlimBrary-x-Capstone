import axios from 'axios';

export const checkRoleAndRedirect = async (router) => {
  try {
    const res = await axios.get('/user');
    const role = res.data.role;

    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'user') {
      router.push('/user');
    } else {
      router.push('/');
    }
  } catch (err) {
    console.error('Failed to fetch user role:', err);
    router.push('/');
  }
};
