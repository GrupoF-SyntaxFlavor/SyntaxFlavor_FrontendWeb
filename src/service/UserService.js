export default class UserService {
    constructor(){
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

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
}