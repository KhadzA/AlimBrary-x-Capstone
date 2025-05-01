"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import "@/ui/css/Dashboard.css"
import "@/ui/css/Auth.css"
import "@/ui/css/General.css"

const UserDashboardUI = ({ onViewBooks, onOpenLogoutModal }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileVisible, setMobileVisible] = useState(false)
    const [navLoading, setNavLoading] = useState(null)
    const router = useRouter()

    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarCollapsed(true)
            }
        }

        // Initial check
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Close mobile sidebar when clicking outside
    const handleOverlayClick = () => {
        setMobileVisible(false)
    }

    const toggleSidebar = () => {
        if (window.innerWidth < 768) {
            setMobileVisible(!mobileVisible)
        } else {
            setSidebarCollapsed(!sidebarCollapsed)
        }
    }

    // Handle navigation with loading state
    const handleNavigation = (path) => {
        if (path) {
            setNavLoading(path)
            router.push(path)
        }
    }

    const handleViewBooks = () => {
        setNavLoading("viewBooks")
        onViewBooks()
    }

    // Navigation items
    const navItems = [
        {
            title: "Dashboard",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            ),
            path: "/user",
            active: router.pathname === "/user",
        },
        {
            title: "View Books",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
            ),
            onClick: handleViewBooks,
            active: router.pathname === "/user/books/viewBooks",
        },
    ]

    return (
        <div className="admin-container">
            {/* Mobile Overlay */}
            <div className={`mobile-overlay ${mobileVisible ? "visible" : ""}`} onClick={handleOverlayClick}></div>

            {/* Sidebar */}
            <aside
                className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileVisible ? "mobile-visible" : ""}`}
            >
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="sidebar-logo-icon">U</div>
                        <span className="sidebar-logo-text">User Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={`nav-item ${item.active ? "active" : ""} ${navLoading === item.path || (item.onClick && navLoading === "viewBooks") ? "loading" : ""
                                }`}
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick()
                                } else if (item.path) {
                                    handleNavigation(item.path)
                                }
                                if (window.innerWidth < 768) {
                                    setMobileVisible(false)
                                }
                            }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-text">
                                {navLoading === item.path || (item.onClick && navLoading === "viewBooks") ? (
                                    <span className="button-content">
                                        <span className="spinner-dark"></span>
                                        <span>Loading...</span>
                                    </span>
                                ) : (
                                    item.title
                                )}
                            </span>
                        </div>
                    ))}

                    <div className="nav-section">
                        <div className="nav-section-title">Account</div>
                        <div className="nav-item" onClick={onOpenLogoutModal}>
                            <span className="nav-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </span>
                            <span className="nav-text">Logout</span>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`admin-main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
                <header className="admin-header">
                    <div className="header-toggle" onClick={toggleSidebar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </div>
                    <h1 className="header-title">User Dashboard</h1>
                    <div className="header-actions">
                        <div className="header-user">
                            <div className="user-avatar">U</div>
                            <span className="user-name">User</span>
                        </div>
                    </div>
                </header>

                <div className="admin-content">
                    <div className="content-header">
                        <h2 className="content-title">Welcome to Your Dashboard</h2>
                        <p className="content-subtitle">Explore our collection of books</p>
                    </div>

                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">Available Books</h3>
                                <div className="card-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    </svg>
                                </div>
                            </div>
                            <div className="card-value">125</div>
                            <div className="card-description">Books in our collection</div>
                        </div>

                        <div
                            className={`dashboard-card ${navLoading === "viewBooks" ? "loading" : ""}`}
                            onClick={handleViewBooks}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-header">
                                <h3 className="card-title">Browse Books</h3>
                                <div className="card-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                            </div>
                            <div className="card-value">
                                {navLoading === "viewBooks" ? (
                                    <span className="spinner-dark"></span>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                )}
                            </div>
                            <div className="card-description">
                                {navLoading === "viewBooks" ? "Loading books..." : "Click to browse all available books"}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UserDashboardUI
