import React, { useState } from 'react'
import '../style/Register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const Register = () => {

  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const { handleRegister, loading } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setErrors({});
        setErrorMessage('');

        try {
            await handleRegister(
                username.trim(),
                email.trim(),
                password
            );

            navigate('/feed');

        } catch (error) {

            const responseData = error.response?.data;

            if (responseData?.errors) {
                setErrors(responseData.errors);
            } else {
                setErrorMessage(
                    responseData?.message ||
                    'Something went wrong. Please try again.'
                );
            }
        }
    }

    return (
        <main className="register-page">

            <div className="register-container">

                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Start your creative journey with us.</p>
                </div>

                <form onSubmit={handleSubmit}>

                  {errorMessage && (
                        <p className="error-message" role="alert">
                            {errorMessage}
                        </p>
                  )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        {errors.username && (
                            <p className="error-message" role="alert">
                                {errors.username}
                            </p>
                        )}

                    </div>

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

                        {errors.email && (
                            <p className="error-message" role="alert">
                                {errors.email}
                            </p>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errors.password && (
                            <p className="error-message" role="alert">
                                {errors.password}
                            </p>
                        )}
                        
                    </div>

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}

                        {!loading && <span>↗</span>}
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


