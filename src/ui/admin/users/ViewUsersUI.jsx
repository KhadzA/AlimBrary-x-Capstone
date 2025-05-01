"use client"

import { useState } from "react"
import Link from "next/link"
import "@/ui/css/Users.css"
import "@/ui/css/General.css"

const ViewUsersUI = ({
    users,
    isLoading,
    isMounted,
    editingUserId,
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

    const handleAddUser = () => {
        setNavLoading("add")
    }

    return (
        <div className="users-container">
            <div className="users-header">
                <h1>Users Management</h1>
                <div className="users-actions">
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
                        href="/admin/users/addUser"
                        className={`nav-button add-button ${navLoading === "add" ? "loading" : ""}`}
                        onClick={() => handleAddUser()}
                    >
                        {navLoading === "add" ? (
                            <span className="button-content">
                                <span className="spinner"></span>
                                <span>Navigating...</span>
                            </span>
                        ) : (
                            "Add New User"
                        )}
                    </Link>
                </div>
            </div>

            {/* Only show loading state if component has mounted on client */}
            {isMounted && isLoading ? (
                <div className="users-loading">
                    <div className="users-loading-spinner"></div>
                    <p>Loading users data...</p>
                </div>
            ) : users.length === 0 ? (
                <div className="empty-state">
                    <p>No users found in the system.</p>
                    <Link
                        href="/admin/users/addUser"
                        className={`nav-button add-button ${navLoading === "add" ? "loading" : ""}`}
                        onClick={() => handleAddUser()}
                    >
                        {navLoading === "add" ? (
                            <span className="button-content">
                                <span className="spinner"></span>
                                <span>Navigating...</span>
                            </span>
                        ) : (
                            "Add Your First User"
                        )}
                    </Link>
                </div>
            ) : (
                <ul className="users-list">
                    {users.map((user) => (
                        <li key={user.id} className="user-card">
                            {editingUserId === user.id ? (
                                <div className="edit-form">
                                    <div>
                                        <div className="edit-label">Name</div>
                                        <input
                                            className="edit-input"
                                            name="name"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <div className="edit-label">Email</div>
                                        <input
                                            className="edit-input"
                                            name="email"
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <div className="edit-label">Password (leave blank to keep current)</div>
                                        <input
                                            className="edit-input"
                                            name="password"
                                            type="password"
                                            value={editForm.password}
                                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button onClick={() => handleSave(user.id)} className="action-button save-button">
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="user-details">
                                        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                                        <div className="user-info">
                                            <h3 className="user-name">{user.name}</h3>
                                            <p className="user-email">{user.email}</p>
                                            {user.role && <span className="user-role">{user.role}</span>}
                                        </div>
                                    </div>

                                    <div className="user-actions">
                                        <button onClick={() => handleEdit(user)} className="action-button edit-button">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="action-button delete-button">
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ViewUsersUI
