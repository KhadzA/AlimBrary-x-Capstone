import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthServer } from '@/helpers/checkAuth'; 
import { fetchBooks, deleteBook, updateBook } from '@/helpers/adminBookHandler';
import ViewBooksUI from '@/ui/admin/books/ViewBooksUI'; 

export default function Books() {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', genre: '' });
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    init();
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    const data = await fetchBooks();
    setBooks(data);
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
    });
  };

  const handleSave = async (id) => {
    await updateBook(id, editForm);
    setEditingBookId(null);
    const data = await fetchBooks();
    setBooks(data);
  };

  const goHome = () => {
    router.push('/admin');
  };

  return (
    <ViewBooksUI
      books={books}
      editingBookId={editingBookId}
      editForm={editForm}
      setEditForm={setEditForm}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleSave={handleSave}
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