import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCheckAuth from '../../../helpers/checkAuth';
import { fetchBooks, deleteBook, updateBook } from '../../../helpers/adminBookHandler';

export default function Books() {
  useCheckAuth();
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
    <div>
      <button onClick={goHome}>Home</button>
      <Link href="/admin/books/addBook">Add Book</Link>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.image && (
              <img
                src={`http://localhost:8000/storage/books_image/${book.image}`}
                alt={book.title}
                style={{ width: '150px', height: 'auto' }}
              />
            )}
            <br />
            {editingBookId === book.id ? (
              <>
                <input
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                />
                <input
                  value={editForm.author}
                  onChange={e => setEditForm({ ...editForm, author: e.target.value })}
                />
                <input
                  value={editForm.genre}
                  onChange={e => setEditForm({ ...editForm, genre: e.target.value })}
                />
                <button onClick={() => handleSave(book.id)}>Save</button>
              </>
            ) : (
              <>
                <strong>Title:</strong> {book.title}<br />
                <strong>Author:</strong> {book.author}<br />
                <strong>Genre:</strong> {book.genre}<br />
              </>
            )}
            {book.pdf && (
              <div>
                <strong>PDF:</strong>{' '}
                <a href={`http://localhost:8000/storage/books_pdf/${book.pdf}`} target="_blank" rel="noopener noreferrer">
                  {book.pdf}
                </a>
              </div>
            )}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            {editingBookId !== book.id && (
              <button onClick={() => handleEdit(book)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
