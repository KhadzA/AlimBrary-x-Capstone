"use client"

import Link from "next/link"
import "@/ui/css/Books.css"

const AddBookUI = ({ title, author, genre, setTitle, setAuthor, setGenre, setImage, setPDF, handleSubmit, goHome }) => {
    return (
        <div className="books-container">
            <div className="books-header">
                <h1>Add New Book</h1>
                <div className="books-actions">
                    <button onClick={goHome} className="nav-button">
                        Back to Dashboard
                    </button>
                    <Link href="/admin/books/viewBooks" className="nav-button">
                        View All Books
                    </Link>
                </div>
            </div>

            <div className="add-book-form-container">
                <form onSubmit={handleSubmit} className="add-book-form">
                    <div className="form-group">
                        <label htmlFor="title">Book Title</label>
                        <input
                            id="title"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            placeholder="Enter author name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input
                            id="genre"
                            placeholder="Enter book genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Book Cover Image</label>
                        <div className="file-input-container">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="file-input"
                            />
                        </div>
                        <p className="input-help-text">Recommended size: 300x450 pixels</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pdf">Book PDF</label>
                        <div className="file-input-container">
                            <input
                                id="pdf"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPDF(e.target.files[0])}
                                className="file-input"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Add Book to Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBookUI
