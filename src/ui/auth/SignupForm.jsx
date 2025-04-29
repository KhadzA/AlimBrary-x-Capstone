"use client"

import Link from "next/link"
import "../css/Auth.css"

export default function SignupForm({ name, setName, email, setEmail, password, setPassword, handleSignup, isLoading }) {
    return (
        <div className="signup-container">
            <div className="signup-header">
                <h1>Sign Up</h1>
                <p>Create a new account to get started</p>
            </div>

            <form onSubmit={handleSignup} className="signup-form">
                <div className="signup-form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="signup-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="signup-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <button type="submit" className="signup-button" disabled={isLoading}>
                    {isLoading ? (
                        <span className="button-content">
                            <span className="spinner"></span>
                            <span>Signing up...</span>
                        </span>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>

            <div className="signup-footer">
                <p>
                    Already have an account?{" "}
                    <Link href="/auth/login" className="signup-link">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}
