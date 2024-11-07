export default class MenuService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Métodos
    async getMenuItems(minPrice, maxPrice, pageNumber, pageSize, sortAscending, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item?minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortAscending=${sortAscending}`, {
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

    async enableMenuItem(menuItemId, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item/${menuItemId}/enable`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('Menu item enabled:', data);
            return data.payload;
        } catch (error) {
            console.error('Error enabling menu item:', error);
            throw error;
        }
    }

    async disableMenuItem(menuItemId, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item/${menuItemId}/disable`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('Menu item disabled:', data);
            return data.payload;
        } catch (error) {
            console.error('Error disabling menu item:', error);
            throw error;
        }
    }

    async createMenuItem(formValues, token){
        try{
            const { name, description, price, image } = formValues;
            const requestBody = { name, description, price };
            console.log('imagen en service:',image )

            const response = await fetch(`${this.BASE_URL}/api/v1/menu/item`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody) // Enviar solo los campos necesarios

            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Menu item created:', data);
            console.log('imagen:',image )
            
            const newItemId = data.payload.id; // Suponiendo que el ID del nuevo ítem se encuentra en `data.payload.id`
            // Luego, si hay una imagen, actualiza la imagen del nuevo ítem
            if (image) {
                await this.updateMenuItemImage(newItemId, image);
                console.log('Imagen del menú actualizada para el item:', newItemId);
            }

            return data.payload;
        } catch (error){
            console.error('Error creating menu item:', error);
            throw error;
        }
    }

    async updateMenuItemImage(menuItemId, image) {
        try {
            // Crear un FormData para construir el multipart/form-data request
            const formData = new FormData();
            formData.append('file', image); // archivo de imagen

            const response = await fetch(`${this.BASE_URL}/api/v1/public/menu/item/${menuItemId}/image`, {
                method: 'PATCH',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Menu item image updated:', data);
            return data.payload;
        } catch (error) {
            console.error('Error updating menu item image:', error);
            throw error;
        }
    }
}