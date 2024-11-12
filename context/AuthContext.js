import React, { createContext, useState, useEffect } from 'react';
import AuthService from '@/service/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const authService = new AuthService();

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            const token = response.access_token;

            if (token) {
                setAuthToken(token);
                setIsAuthenticated(true);
                decodeToken(token);
                localStorage.setItem("authToken", token); // Guarda el token en localStorage
            }
            return response;
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1]; // La parte del payload está en la segunda posición
            const decodedPayload = JSON.parse(atob(payload)); // Decodifica el payload

            const roles = decodedPayload.resource_access?.syntaxflavor?.roles || [];
            const { preferred_username, email, name } = decodedPayload;

            console.log("Roles:", roles);
            console.log("User info:", { preferred_username, email, name });
            setUserRoles(roles);
            setUserInfo({ preferred_username, email, name });
        } catch (error) {
            console.error("Error decoding token manually:", error);
        }
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserRoles([]);
        setUserInfo({});
        localStorage.removeItem("authToken"); // Elimina el token de localStorage al cerrar sesión
    };

    useEffect(() => {
        // Carga el token desde localStorage al iniciar la aplicación
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setAuthToken(storedToken);
            setIsAuthenticated(true);
            decodeToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, userRoles, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
