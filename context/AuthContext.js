import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '@/service/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const authService = new AuthService();

    useEffect(() => {
        // Intenta obtener el token almacenado en localStorage al cargar el componente
        const token = localStorage.getItem('authToken');
        console.log("authtoken", token)
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('authToken', response.access_token); // Guardar en localStorage
            setAuthToken(response.access_token);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Limpiar localStorage
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
