import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { fetchBooks } from '@/helpers/userBookHandler';
import useCheckAuth from '@/helpers/checkAuth';
import ViewUserBooksUI from '@/ui/user/books/ViewBooksUI'; 

export default function Books() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    init();
  }, []);

  return (
    <ViewUserBooksUI
      books={books}
      onGoHome={() => router.push('/user')}
    />
  );
}

export async function getServerSideProps(context) {
  const auth = await checkAuthServer(context);

  if (!auth.authenticated) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}