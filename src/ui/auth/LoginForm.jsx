"use client"

import Link from "next/link"
import "../css/Auth.css"

export default function LoginForm({ email, setEmail, password, setPassword, handleLogin, isLoading }) {
    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Log In</h1>
                <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
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

                <div className="form-group">
                    <div className="password-header">
                        <label htmlFor="password">Password</label>
                        <Link href="/auth/forgot-password" className="forgot-link">
                            Forgot password?
                        </Link>
                    </div>
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

                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? (
                        <span className="button-content">
                            <span className="spinner"></span>
                            <span>Logging in...</span>
                        </span>
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>

            <div className="signup-section">
                <p>
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="signup-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
