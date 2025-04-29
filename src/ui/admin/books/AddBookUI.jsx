import Link from 'next/link';

const AddBookUI = ({
    title,
    author,
    genre,
    setTitle,
    setAuthor,
    setGenre,
    setImage,
    setPDF,
    handleSubmit,
    goHome,
}) => {
    return (
        <div>
            <button onClick={goHome}>Home</button>
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <label>Upload Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label>Upload PDF:</label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPDF(e.target.files[0])}
                />
                <button type="submit">Add Book</button>
            </form>

            <Link href="/admin/books/viewBooks">View Books</Link>
        </div>
    );
};

export default AddBookUI;
