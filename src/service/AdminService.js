export default class AdminService {
    constructor() {
        this.BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

    async signupKitchen(name, email, password, location) {
        try {
            const response = await fetch(`${this.BASE_URL}/api/v1/public/signup?type=kitchen`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    location: location
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error signing up kitchen", error);
            throw error;
        }
    }
}
