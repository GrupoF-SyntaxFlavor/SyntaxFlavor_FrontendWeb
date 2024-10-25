export default class MenuService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Métodos
    async getMenuItems(minPrice, maxPrice, pageNumber, pageSize, sortAscending, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item?minPrice=${minPrice}&?maxPrice=${maxPrice}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortAscending=${sortAscending}`, {
            method: 'GET',
            headers: {
                'Authorization':  `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            });
            const data = await response.json();
            console.log('Menu items:', data);
            return data.payload;
        } catch (error) {
            console.error('Error get menu items:', error);
            throw error;
        }
    }

    async enableMenuItem(menuItemId) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item/${menuItemId}/enable`, {
            method: 'PATCH',
            });
            const data = await response.json();
            console.log('Menu item enabled:', data);
            return data.payload;
        } catch (error) {
            console.error('Error enabling menu item:', error);
            throw error;
        }
    }

    async disableMenuItem(menuItemId) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item/${menuItemId}/disable`, {
            method: 'PATCH',
            });
            const data = await response.json();
            console.log('Menu item disabled:', data);
            return data.payload;
        } catch (error) {
            console.error('Error disabling menu item:', error);
            throw error;
        }
    }
}