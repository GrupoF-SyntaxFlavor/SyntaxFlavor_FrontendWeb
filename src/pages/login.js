import React, { useState } from 'react';
import { useRouter } from "next/router";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Correo:", email);
        // console.log("Contraseña:", password);
        // Aquí puedes hacer la petición de login a tu backend
    };
    
    //TODO: cambiar la lógica cuando se haga el consumo de login
    const handleLogin = () => {
        router.push("/kitchen/order");
    };
    

    return ( 
        
        <div className="flex align-items-center justify-content-center min-h-screen " style={{
            backgroundImage: `url('/syntax.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
            }}>
            <div className="card p-4 shadow-2 border-round lg:w-6" 
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Mayor transparencia
                    backdropFilter: 'blur(15px)', // Efecto de desenfoque del fondo
                    WebkitBackdropFilter: 'blur(10px)', // Soporte adicional para Safari
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Opcional: borde suave para mayor contraste
                  }}
            >
                <div className="text-center mb-5">
                    <Image src="/sushi.png" alt="hyper" height={150} className="mb-3" />
                    <div className="text-900 text-4xl font-medium mb-3">Bienvenido a SyntaxFlavor</div>
                    <span className="text-600 font-medium line-height-3">Inicia tu sesión!</span>
                    
                </div>
                <div >
                    <label htmlFor="email" className="block text-900 text-xl  font-medium mb-2">Correo electrónico</label>
                    <InputText id="email" type="text" placeholder="SyntaxFlavor@gmail.com" className="w-full mb-3"/>

                    <label htmlFor="password" className="block text-900 text-xl  font-medium mb-2">Contraseña</label>
                    <InputText id="password" type="password" placeholder="********" className="w-full mb-3" />

                    <div className="mb-6">
                    </div>
                    
                    <Button label="Iniciar Sesión" icon="pi pi-user" className="p-button-login w-full" type="submit" onClick={handleLogin}/>
                </div>
            </div>
        </div>

    );
};

export default LoginForm;

    