import { createContext, useState } from 'react';
import { login, register, getMe } from './services/auth.api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Register user
    const handleRegister = async (username, email, password) => {
        setLoading(true);

        try {
            const data = await register(username, email, password);

            setUser(data.user);

            return data;

        } finally {
            setLoading(false);
        }
    };

    // Login user
    const handleLogin = async (username, password) => {
        setLoading(true);

        try {
            const data = await login(username, password);

            setUser(data.user);

            return data;

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                handleRegister,
                handleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}