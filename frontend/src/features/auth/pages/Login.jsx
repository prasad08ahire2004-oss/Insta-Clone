import React, { useState } from 'react';
import '../style/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage('');

        try {
            await handleLogin(email.trim(), password);
            navigate('/feed');
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                'Login failed. Please try again.'
            );
        }
    }

    return (
        <main className="login-page">
            <div className="login-container">

                {/* Header */}
                <div className="login-header">
                    <span className="login-label">WELCOME BACK</span>

                    <h1>Login to your account.</h1>

                    <p>
                        Welcome back! Please enter your details.
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <p className="error-message" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="password-label">
                            <label htmlFor="password">Password</label>
                        </div>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                        {!loading && <span>↗</span>}
                    </button>
                </form>

                {/* Register Link */}
                <div className="login-footer">
                    <p>
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </div>

                {/* Bottom Text */}
                <div className="login-bottom">
                    <span></span>
                    <p>YOUR CREATIVE JOURNEY STARTS HERE</p>
                    <span></span>
                </div>

            </div>
        </main>
    );
};

export default Login;