import React, { createContext, useState, useContext } from 'react';
import UserService from '@/service/UserService';
import { AuthContext } from './AuthContext';

// Create the UserContext
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [kitchenUsers, setKitchenUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalRecords, settotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10); // Cantidad de filas por página
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');

    const { authToken } = useContext(AuthContext);

    const userService = new UserService();

    //console.log("authToken in userContext: ", authToken);

    const loadKitchenUsers = async () => {
        try {
            //console.log("solicitud: ", page, rows, sortBy, sortOrder, authToken)
            const response = await userService.getKitchenUsers(page, rows, sortBy, sortOrder, authToken);
            //console.log("response, UserContext: ", response)
            setKitchenUsers(response.content);
            settotalRecords(response.totalElements);
            if(response.first) {
                setFirst(0);
            }
        } catch (error) {
            console.error('Error loading menu items:', error);
        }
    };

    return (
        <UserContext.Provider value={{ 
            kitchenUsers, 
            loadKitchenUsers, 
            first,
            setFirst,
            rows,
            setRows, 
            totalRecords, 
            settotalRecords,
            page,
            setPage,
            sortBy,
            setSortBy,
            sortOrder, 
            setSortOrder,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };