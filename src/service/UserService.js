export default class UserService {
    constructor(){
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

/*"userId": 1100,
        "name": "Al ‘Awjā",
        "email": "AlAwja@syntax.flavor"*/
        
    async getKitchenUsers(pageNumber, pageSize, sortBy, sortOrder, token){
        console.log("Fetching kitchen users");
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/users-with-kitchen?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("url: GET http://localhost:8080/api/v1/users-with-kitchen?page=0&size=5&sortBy=id&sortOrder=desc")
            console.log("url", `${this.BASE_URL}/api/v1/users-with-kitchen?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
            console.log("token", token);
            console.log("response", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("data kitchen users: ", data);
            return data.payload;  // Retornamos el contenido del payload
            
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    };
}