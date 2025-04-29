import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { addBook } from '@/helpers/adminBookHandler';
import AddBookUI from '@/ui/admin/books/AddBookUI'; 

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState(null);
  const [pdf, setPDF] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    if (image) formData.append('image', image);
    if (pdf) formData.append('pdf', pdf);

    try {
      await addBook(formData);
      setTitle('');
      setAuthor('');
      setGenre('');
      setImage(null);
      setPDF(null);
      router.push('/admin/books/viewBooks');
    } catch (error) {
      console.error('Error:', error.response?.data || error);
    }
  };

  const goHome = () => {
    router.push('/admin');
  };

  return (
    <AddBookUI
      title={title}
      author={author}
      genre={genre}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setGenre={setGenre}
      setImage={setImage}
      setPDF={setPDF}
      handleSubmit={handleSubmit}
      goHome={goHome}
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