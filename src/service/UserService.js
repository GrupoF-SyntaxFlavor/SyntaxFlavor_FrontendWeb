export default class UserService {
    constructor(){
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

    async getKitchenUsers(){
        // TODO: Implementar el método para obtener los usuarios de cocina, de momento retornamos mockdata
        return [
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
            }
        ];
    };
}