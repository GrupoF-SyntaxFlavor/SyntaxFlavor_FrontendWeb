import React, { createContext, useState, useContext } from 'react';
import MenuService from '@/service/MenuService';
import { AuthContext } from './AuthContext';

// Define the shape of a MenuItem
const MenuItemResponseDTO = {
    id: null,
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
    status: false
};

// Create the MenuContext
const MenuContext = createContext();

// Create a provider component
const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const menuService = new MenuService();

    const [first, setFirst] = useState(0); // Control de la paginación (inicio)
    const [rows, setRows] = useState(10); // Cantidad de filas por página
    const [totalRecords, setTotalRecords] = useState(0); // Total de registros para la paginación
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [selectedItemSort, setSelectedItemSort] = useState('true');
    const [pageNumber, setPageNumber] = useState(0);
    const { authToken } = useContext(AuthContext);

    const loadMenuItems = async () => {
        try {
            const response = await menuService.getMenuItems(minPrice, maxPrice, pageNumber, rows, selectedItemSort, authToken);
            setMenuItems(response.content);
            setTotalRecords(response.totalElements);
            if(response.first) {
                setFirst(0);
            }
        } catch (error) {
            console.error('Error loading menu items:', error);
        }
    };

    const changeMenuItemStatus = async (menuItemId, status) => {
        try {
            if (status) {
                await menuService.enableMenuItem(menuItemId, authToken);
            } else {
                await menuService.disableMenuItem(menuItemId, authToken);
            }
            const updatedMenuItems = menuItems.map(item => {
                if (item.id === menuItemId) {
                    item.status = status;
                }
                return item;
            });
            setMenuItems(updatedMenuItems);
        } catch (error) {
            console.error('Error changing menu item status:', error);
        }
    };
    

    return (
        <MenuContext.Provider value={{ 
            menuItems,
            loadMenuItems,
            changeMenuItemStatus,
            first,
            setFirst,
            rows,
            setRows,
            totalRecords,
            setTotalRecords,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            selectedItemSort,
            setSelectedItemSort,
            pageNumber,
            setPageNumber
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };