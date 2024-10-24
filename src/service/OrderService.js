
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
    //http://localhost:8080/api/v1/public/order/status?status=Cancelado&pageNumber=0
    async getOrdersByStatus(status, pageNumber, asc, token) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/order?status=${status}&pageNumber=${pageNumber}&sortAscending=${asc}`, {
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

    //metodo para cacelar una orden
    // PUT http://localhost:8080/api/v1/public/order/cancel?orderId=1
    async cancelOrder(orderId) {
        console.log('Canceling order in service:', orderId);
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/public/order/cancel?orderId=${orderId}`, {
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
        console.log('Canceling order in service:', orderId);
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/public/order/deliver?orderId=${orderId}`, {
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
