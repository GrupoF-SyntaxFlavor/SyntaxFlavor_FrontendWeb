export default class AuthService {
    constructor(){
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

    //Método de login
    async login(email, password){
        console.log("has value in envs of: ", process.env.NEXT_PUBLIC_BACKEND_URL); // erase later
        console.log("has value in envs of: ", process.env.NEXT_PUBLIC_MINIO_URL);
        try{
            //console.log("Logging in with email and password", email, password); // erase later
            console.log("sending to", `${this.BASE_URL}/api/v1/public/login`); // erase later
            const response = await fetch(`${this.BASE_URL}/api/v1/public/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); //TODO: save the token in local storage
            console.log("Login data", data);
            return data.payload;
        } catch (error) {
            console.error("Error logging in", error);
            throw error;
        }
    };
}