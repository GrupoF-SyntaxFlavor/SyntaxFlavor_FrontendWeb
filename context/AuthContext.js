import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, getCookie, removeCookie } from 'cookies-next';
import AuthService from '@/service/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const authService = new AuthService();

    useEffect(() => {
        // Intenta obtener el token almacenado en las cookies al cargar el componente
        const token = getCookie('authToken');
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            console.log("response",response);
            setCookie('authToken', response.access_token, { httpOnly: true, secure: false });
            console.log("authToken",response.access_token);
            setAuthToken(response.access_token); 
            console.log("setAuthToken",response.access_token);
            setIsAuthenticated(true);

            console.log("get",getCookie())
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        removeCookie('authToken');
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
//---------------------------------

// import AuthService from '@/service/AuthService';

// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [authToken, setAuthToken] = useState(null); // TODO: Maybe use cookies instead
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const authService = new AuthService();

//     const login = async (email, password) => {
//         //console.log('Context::Logging in with:', email);
//         try {
//             const response = await authService.login(email, password);
//             setAuthToken(response.access_token);
//             await setIsAuthenticated(true);
//             return response;
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const logout = () => {
//         setAuthToken(null);
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };