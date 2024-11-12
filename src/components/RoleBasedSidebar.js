// RoleBasedSidebar.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import KitchenSidebar from '@/components/kitchen/KitchenSidebar';

const RoleBasedSidebar = ({ children }) => {
    const { userRoles } = useContext(AuthContext);
    // Verifica los roles para determinar qué Sidebar mostrar
    const isAdmin = userRoles.includes('administrator');
    const isKitchenUser = userRoles.includes('kitchen'); // Asumiendo que 'kitchen' es el rol para usuarios de cocina

    if (isAdmin) {
        return <AdminSidebar>{children}</AdminSidebar>;
    } else if (isKitchenUser) {
        return <KitchenSidebar>{children}</KitchenSidebar>;
    } else {
        return null; // O muestra un sidebar por defecto o un mensaje de error si el rol no coincide con ninguno
    }
};

export default RoleBasedSidebar;
