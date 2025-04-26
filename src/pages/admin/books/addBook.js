import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCheckAuth from '../../../helpers/checkAuth';
import { addBook } from '../../../helpers/adminBookHandler';

export default function AddBook() {
  useCheckAuth();
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
    <div>
      <button onClick={goHome}>Home</button>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder='Genre'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
        <label>Upload PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setPDF(e.target.files[0])}
        />
        <button type="submit">Add Book</button>
      </form>

      <Link href="/admin/books/viewBooks">View Books</Link>
    </div>
  );
}
