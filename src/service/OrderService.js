export default class OrderService {
    // Método para obtener las órdenes paginadas
    async getOrders(pageNumber = 0) {
        const BASE_URL = 'http://localhost:8080/api/v1/order';  // Reemplaza con la URL real de tu API
        try {
            const response = await fetch(`${BASE_URL}?pageNumber=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.payload;  // Retornamos el contenido del payload
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    }
    // Método para obtener las ordenes paginadas por estado
    //http://localhost:8080/api/v1/order/status?status=Cancelado&pageNumber=0
    async getOrdersByStatus(status, pageNumber) {
        const BASE_URL = 'http://localhost:8080/api/v1/order/status';  // Reemplaza con la URL real de tu API
        try {
            const response = await fetch(`${BASE_URL}?status=${status}&pageNumber=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.payload;  // Retornamos el contenido del payload
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    }
}
