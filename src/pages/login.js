import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    
    const handleLogin = () => {
        router.push("/kitchen/order");
    };
    
    return (
        <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Login</button>
        </div>
    );
    }