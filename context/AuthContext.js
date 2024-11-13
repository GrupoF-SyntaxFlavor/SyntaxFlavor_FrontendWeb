import React, { createContext, useState, useEffect } from 'react';
import AuthService from '@/service/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const authService = new AuthService();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        //console.log("authtoken", token)
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            decodeToken(token);
        }
    }, []);

    /* useEffect(() => {
        console.log("authToken changed:", authToken);
        console.log("isAuthenticated changed:", isAuthenticated);
        console.log("userRoles changed:", userRoles);
        console.log("userInfo changed:", userInfo);
    }, [authToken, isAuthenticated, userRoles, userInfo]); */

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            const token = response.access_token;

            if (token) {
                setAuthToken(token);
                decodeToken(token);
                setIsAuthenticated(true);
                localStorage.setItem("authToken", token); // Guarda el token en localStorage
            }
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1]; // La parte del payload está en la segunda posición
            const decodedPayload = JSON.parse(atob(payload)); // Decodifica el payload

            const roles = decodedPayload.resource_access?.syntaxflavor?.roles || [];
            const { preferred_username, email, name } = decodedPayload;

            console.log("Roles:", roles);
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
        localStorage.removeItem("authToken"); 
    };

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, userRoles, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
