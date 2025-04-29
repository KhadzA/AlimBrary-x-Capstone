import axios from 'axios';

export async function checkAuthServer(context) {
  const { req } = context;

  try {
    await axios.get('http://localhost:8000/user', {
      headers: {
        Cookie: req.headers.cookie || '',
      },
      withCredentials: true,
    });

    return { authenticated: true };
  } catch (error) {
    return { authenticated: false };
  }
}
