import React, { useState } from 'react'
import '../styles/Register.scss'


const Register = () => {

    return (
        <main className="register-page">

            <div className="register-container">

                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Start your creative journey with us.</p>
                </div>

                <form>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

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
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            minLength={8}
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">
                        Create Account
                        <span>↗</span>
                    </button>

                </form>

                <div className="register-footer">
                    <p>
                        Already have an account?
                        <a href="/login"> Login</a>
                    </p>
                </div>

            </div>

        </main>
    )
}

export default Register


