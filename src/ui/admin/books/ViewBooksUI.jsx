"use client"

import { useState } from "react"
import Link from "next/link"
import "@/ui/css/Books.css"
import "@/ui/css/General.css"

const ViewBooksUI = ({
    books,
    isLoading,
    isMounted,
    editingBookId,
    editForm,
    setEditForm,
    handleDelete,
    handleEdit,
    handleSave,
    goHome,
}) => {
    const [navLoading, setNavLoading] = useState(null)

    const handleGoHome = () => {
        setNavLoading("home")
        goHome()
    }

    const handleAddBook = () => {
        setNavLoading("add")
    }

    return (
        <div className="books-container">
            <div className="books-header">
                <h1>Books Collection</h1>
                <div className="books-actions">
                    <button
                        onClick={handleGoHome}
                        className={`nav-button ${navLoading === "home" ? "loading" : ""}`}
                        disabled={navLoading === "home"}
                    >
                        {navLoading === "home" ? (
                            <span className="button-content">
                                <span className="spinner-dark"></span>
                                <span>Navigating...</span>
                            </span>
                        ) : (
                            "Back to Dashboard"
                        )}
                    </button>
                    <Link
                        href="/admin/books/addBook"
                        className={`nav-button add-button ${navLoading === "add" ? "loading" : ""}`}
                        onClick={() => handleAddBook()}
                    >
                        {navLoading === "add" ? (
                            <span className="button-content">
                                <span className="spinner"></span>
                                <span>Navigating...</span>
                            </span>
                        ) : (
                            "Add New Book"
                        )}
                    </Link>
                </div>
            </div>

            {/* Only show loading state if component has mounted on client */}
            {isMounted && isLoading ? (
                <div className="books-loading">
                    <div className="books-loading-spinner"></div>
                    <p>Loading books collection...</p>
                </div>
            ) : books.length === 0 ? (
                <div className="empty-state">
                    <p>No books found in the collection.</p>
                    <Link
                        href="/admin/books/addBook"
                        className={`nav-button add-button ${navLoading === "add" ? "loading" : ""}`}
                        onClick={() => handleAddBook()}
                    >
                        {navLoading === "add" ? (
                            <span className="button-content">
                                <span className="spinner"></span>
                                <span>Navigating...</span>
                            </span>
                        ) : (
                            "Add Your First Book"
                        )}
                    </Link>
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
                                {editingBookId === book.id ? (
                                    <div className="edit-form">
                                        <input
                                            className="edit-input"
                                            value={editForm.title}
                                            placeholder="Title"
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        />
                                        <input
                                            className="edit-input"
                                            value={editForm.author}
                                            placeholder="Author"
                                            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                                        />
                                        <input
                                            className="edit-input"
                                            value={editForm.genre}
                                            placeholder="Genre"
                                            onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                                        />
                                        <button onClick={() => handleSave(book.id)} className="action-button save-button">
                                            Save Changes
                                        </button>
                                    </div>
                                ) : (
                                    <>
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

                                        <div className="book-actions">
                                            <button onClick={() => handleEdit(book)} className="action-button edit-button">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(book.id)} className="action-button delete-button">
                                                Delete
                                            </button>
                                        </div>
                                    </>
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
