import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import useCheckAuth from '../../../helpers/checkAuth';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');

export default function Books() {
  useCheckAuth();
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await axios.get('/sanctum/csrf-cookie'); // ⏳ Get CSRF cookie
      fetchBooks();
    };
    init();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('/book');
    setBooks(res.data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => router.push('/user')}>Go Home</button>
      <h1>Available Books</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: '2rem' }}>
            {book.image && (
              <img
                src={`http://localhost:8000/storage/books_image/${book.image}`}
                alt={book.title}
                style={{ width: '150px', height: 'auto' }}
              />
            )}
            <div>
              <strong>Title:</strong> {book.title}<br />
              <strong>Author:</strong> {book.author}<br />
              <strong>Genre:</strong> {book.genre}<br />
              {book.pdf && (
                <div>
                  <strong>PDF:</strong>{' '}
                  <a
                    href={`http://localhost:8000/storage/books_pdf/${book.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.pdf}
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
