"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import "@/ui/css/Dashboard.css"
import "@/ui/css/Auth.css"

const AdminDashboardUI = ({ onRedirect, onOpenLogoutModal }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileVisible, setMobileVisible] = useState(false)
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
            path: "/admin",
            active: router.pathname === "/admin",
        },
        {
            title: "Books",
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
            path: "/admin/books/viewBooks",
            active: router.pathname === "/admin/books/viewBooks",
        },
        {
            title: "Users",
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            path: "/admin/users/viewUsers",
            active: router.pathname === "/admin/users/viewUsers",
        },
    ]

    return (
        <>
            <div className="admin-container">
                {/* Mobile Overlay */}
                <div className={`mobile-overlay ${mobileVisible ? "visible" : ""}`} onClick={handleOverlayClick}></div>

                {/* Sidebar */}
                <aside
                    className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileVisible ? "mobile-visible" : ""}`}
                >
                    <div className="sidebar-header">
                        <div className="sidebar-logo">
                            <div className="sidebar-logo-icon">A</div>
                            <span className="sidebar-logo-text">Admin Panel</span>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className={`nav-item ${item.active ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onRedirect(item.path)
                                    if (window.innerWidth < 768) {
                                        setMobileVisible(false)
                                    }
                                }}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.title}</span>
                            </Link>
                        ))}

                        <div className="nav-section">
                            <div className="nav-section-title">Account</div>
                            <div
                                className="nav-item"
                                onClick={() => {
                                    console.log("Logout button clicked")
                                    onOpenLogoutModal()
                                }}
                            >
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
                        <h1 className="header-title">Admin Dashboard</h1>
                        <div className="header-actions">
                            <div className="header-user">
                                <div className="user-avatar">A</div>
                                <span className="user-name">Admin</span>
                            </div>
                        </div>
                    </header>

                    <div className="admin-content">
                        <div className="content-header">
                            <h2 className="content-title">Dashboard Overview</h2>
                            <p className="content-subtitle">Welcome to your admin dashboard</p>
                        </div>

                        <div className="dashboard-cards">
                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h3 className="card-title">Total Books</h3>
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
                                <div className="card-description">Books in your collection</div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h3 className="card-title">Total Users</h3>
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
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="card-value">48</div>
                                <div className="card-description">Registered users</div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h3 className="card-title">Recent Activity</h3>
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
                                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="card-value">24</div>
                                <div className="card-description">Actions in the last 24 hours</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminDashboardUI
