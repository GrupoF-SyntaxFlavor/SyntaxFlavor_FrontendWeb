import AuthService from '@/service/AuthService';

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authService = new AuthService();

    const login = async (email, password) => {
        //console.log('Context::Logging in with:', email);
        try {
            const response = await authService.login(email, password);
            setAuthToken(response.access_token);
            await setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };