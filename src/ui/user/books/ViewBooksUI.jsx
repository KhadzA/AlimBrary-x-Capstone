"use client"
import "@/ui/css/Books.css"

const ViewBooksUI = ({ books, isLoading, isMounted, goHome }) => {
    return (
        <div className="books-container">
            <div className="books-header">
                <h1>Books Collection</h1>
                <div className="books-actions">
                    <button onClick={goHome} className="nav-button">
                        Back to Dashboard
                    </button>
                </div>
            </div>

            {isMounted && isLoading ? (
                <div className="books-loading">
                    <div className="books-loading-spinner"></div>
                    <p>Loading books collection...</p>
                </div>
            ) : books.length === 0 ? (
                <div className="empty-state">
                    <p>No books found in the collection.</p>
                </div>
            ) : (
                <ul className="books-list">
                    {books.map((book) => (
                        <li key={book.id} className="book-card">
                            <div className="book-image-container">
                                {book.image ? (
                                    <img
                                        src={`http://localhost:8000/storage/books_image/${book.image}`}
                                        alt={book.title}
                                        className="book-image"
                                    />
                                ) : (
                                    <div className="book-image-placeholder">No Image Available</div>
                                )}
                            </div>

                            <div className="book-details">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-info">
                                    <strong>Author:</strong> {book.author}
                                </p>
                                <p className="book-info">
                                    <strong>Genre:</strong> {book.genre}
                                </p>

                                {book.pdf && (
                                    <div className="book-pdf">
                                        <a
                                            href={`http://localhost:8000/storage/books_pdf/${book.pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ViewBooksUI
