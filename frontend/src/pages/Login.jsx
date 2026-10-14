import React, { useState } from 'react'
import '../styles/Login.scss'

const Login = () => {

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
                <form>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
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
                            required
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <a href="/forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="login-btn">
                        Login
                        <span>↗</span>
                    </button>

                </form>

                {/* Register Link */}
                <div className="login-footer">
                    <p>
                        Don't have an account?
                        <a href="/register"> Register</a>
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
    )
}

export default Login
