"use client"

import Link from "next/link"
import "@/ui/css/Users.css"

const AddUserUI = ({ form, setForm, goHome, handleChange, handleAddUser, isLoading }) => {
    return (
        <div className="users-container">
            <div className="users-header">
                <h1>Add New User</h1>
                <div className="users-actions">
                    <button onClick={goHome} className="nav-button">
                        Back to Dashboard
                    </button>
                    <Link href="/admin/users/viewUsers" className="nav-button">
                        View All Users
                    </Link>
                </div>
            </div>

            <div className="add-user-form-container">
                <form onSubmit={handleAddUser} className="add-user-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Enter user's full name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? (
                                <span className="button-content">
                                    <span className="spinner"></span>
                                    <span>Creating user...</span>
                                </span>
                            ) : (
                                "Create User Account"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUserUI
