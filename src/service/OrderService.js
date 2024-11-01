
export default class OrderService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        this.IMAGE_URL = process.env.NEXT_PUBLIC_MINIO_URL;
    }

    // Método para obtener las órdenes paginadas
    async getOrders(pageNumber = 0) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/public/order?pageNumber=${pageNumber}`, {
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
    async getOrdersByStatus(status, pageNumber, asc, startDate, endDate, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/order?status=${status}&minDate=${startDate}&maxDate=${endDate}&pageNumber=${pageNumber}&sortAscending=${asc}`, {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`,
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

    //metodo para cancelar una orden
    async cancelOrder(orderId, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/order/cancel?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cancel order response:', data);
            return data;  // Retornamos el contenido del payload
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    }

    //metodo para completar una orden
    async completeOrder(orderId, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/order/deliver?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('complete order response:', data);
            return data;  // Retornamos el contenido del payload
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    }

}
