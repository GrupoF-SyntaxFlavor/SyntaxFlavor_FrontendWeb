import React, { createContext, useState, useContext } from 'react';
import UserService from '@/service/UserService';
import { AuthContext } from './AuthContext';

// Create the UserContext
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [kitchenUsers, setKitchenUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(10); // TODO: This value must be set from the service
    const [rows, setRows] = useState(10); // Cantidad de filas por página
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const { authToken } = useContext(AuthContext);

    const userService = new UserService();

    const loadKitchenUsers = async () => {
        try {
            console.log('Fetching kitchen users with token', authToken);
            const response = await userService.getKitchenUsers(pageNumber, rows, sortBy, sortOrder, authToken);
            setKitchenUsers(response.data);
        } catch (error) {
            console.error('Failed to load kitchen users', error);
        }
    };

    return (
        <UserContext.Provider value={{ kitchenUsers, loadKitchenUsers, setPageNumber, setRows, setSortBy, setSortOrder, totalPages }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };