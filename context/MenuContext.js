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

    const addMenuItem = async (formValues) => {
        try {
            const newItem = await menuService.createMenuItem(formValues, authToken);
            setMenuItems(prevItems => [...prevItems, newItem]);
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    const deleteMenuItem = async (menuItemId) => {
        try {
            const response = await menuService.deleteMenuItem(menuItemId, authToken);

            if (response.responseCode === 'MEN-005') {
                // Eliminar el elemento del estado solo si la respuesta es exitosa
                setMenuItems(prevItems => prevItems.filter(item => item.id !== menuItemId));
                console.log('Menu item deleted successfully.');
                return 200; // Indica éxito
            } else if (response.responseCode === 'MEN-409') {
                // Muestra el mensaje de error si hay un conflicto
                console.error(`Error: ${response.errorMessage}`);
                return 409; // Indica conflicto
            }
        } catch (error) {
            console.error('Error deleting menu item:', error);
            return 500; // Indica error del servidor
        }
    };

    return (
        <MenuContext.Provider value={{ 
            menuItems,
            loadMenuItems,
            addMenuItem,
            changeMenuItemStatus,
            deleteMenuItem,
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