export default class OrderService {
    // Método para obtener las órdenes paginadas
    async getOrders(pageNumber = 0) {
        const BASE_URL = 'http://localhost:8080/api/v1/public/order';  // Reemplaza con la URL real de tu API
        try {
            const response = await fetch(`${BASE_URL}?pageNumber=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response orders------------------:', response);
            
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
    //http://localhost:8080/api/v1/public/order/status?status=Cancelado&pageNumber=0
    async getOrdersByStatus(status, pageNumber) {
        const BASE_URL = 'http://localhost:8080/api/v1/public/order/status';  // Reemplaza con la URL real de tu API
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

    //metodo para cacelar una orden
    // PUT http://localhost:8080/api/v1/public/order/cancel?orderId=1
    async cancelOrder(orderId) {
        const BASE_URL = 'http://localhost:8080/api/v1/public/order/cancel';
        console.log('Canceling order in service:', orderId);
        try {
            const response = await fetch(`${BASE_URL}?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
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
    // PUT http://localhost:8080/api/v1/public/order/deliver?orderId=413
    async completeOrder(orderId) {
        const BASE_URL = 'http://localhost:8080/api/v1/public/order/deliver';
        console.log('Canceling order in service:', orderId);
        try {
            const response = await fetch(`${BASE_URL}?orderId=${orderId}`, {
                method: 'PUT',
                headers: {
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
