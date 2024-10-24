export default class MenuService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Métodos
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