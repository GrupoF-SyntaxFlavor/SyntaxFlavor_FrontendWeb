export default class UserService {
    constructor(){
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

/*"userId": 1100,
        "name": "Al ‘Awjā",
        "email": "AlAwja@syntax.flavor"*/

    async getKitchenUsers({pageNumber, pageSize, nameSearch}){
        console.log("Fetching kitchen users, implementation not ready yet");
            // TODO: Implementar el método para obtener los usuarios de cocina, de momento retornamos mockdata
            const data = [
                {
                    "username": "La Paz",
                    "email": "lapaz@syntax.flavor",
                    "location": "La Paz"
                },
                {
                    "username": "Cochabamba",
                    "email": "cochabamba@syntax.flavor",
                    "location": "Cochabamba"
                },
                {
                    "username": "Santa Cruz",
                    "email": "santacruz@syntax.flavor",
                    "location": "Santa Cruz"
                },
                {
                    "username": "Oruro",
                    "email": "oruro@syntax.flavor",
                    "location": "Oruro"
                },
                {
                    "username": "Potosí",
                    "email": "potosi@syntax.flavor",
                    "location": "Potosí"
                },
            ];
            //TODO: Filter data by nameSearch, this is a mock implementation
            if(nameSearch !== undefined && nameSearch !== ""){
                var filtered_data = data.filter((user) => user.username.includes(nameSearch));
            } else {
                var filtered_data = data;
            }
            //TODO: Implement pagination, this is a mock implementation
        
            const paged_data = filtered_data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
            return paged_data;

    };
                                            //localhost:8080/api/v1/users-with-kitchen?page=0&size=5&sortBy=name&sortOrder=asc
    async getKitchenUsers2({pageNumber, pageSize, sortBy, sortOrder, token}){
        console.log("Fetching kitchen users");
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/users-with-kitchen?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("url", `${this.BASE_URL}/api/v1/users-with-kitchen?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
            console.log("token", token);
            console.log("response", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.payload;  // Retornamos el contenido del payload
            console.log("data", data);
        } catch (error) {
            console.error("Error fetching orders", error);
            throw error;  // Lanzamos el error para que pueda ser manejado en el front
        }
    };
}