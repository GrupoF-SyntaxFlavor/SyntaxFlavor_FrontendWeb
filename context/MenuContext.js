import React, { createContext, useState } from 'react';

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

    const addMenuItem = (item) => {
        setMenuItems(prevItems => [...prevItems, item]);
    };

    const updateMenuItem = (id, updatedItem) => {
        setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
    };

    const removeMenuItem = (id) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
    };

    const removeAllMenuItems = () => {
        setMenuItems([]);
    };

    return (
        <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, removeMenuItem, removeAllMenuItems, setMenuItems}}>
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };