import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchBooks } from '../../../helpers/userBookHandler'; 
import useCheckAuth from '../../../helpers/checkAuth'; 

export default function Books() {
  useCheckAuth();
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
