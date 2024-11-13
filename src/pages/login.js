import React, { useState, useRef, useContext, useEffect  } from 'react';
import { useRouter } from "next/router";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
    const {  login, userRoles, isAuthenticated } = useContext(AuthContext); // Asegúrate de obtener userRoles del contexto
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);

    // Validación de correo
    const validateEmail = (email) => {
        // Expresión regular simple para validar el formato de un correo
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Lógica para manejar el login
    const handleLogin = async () => {
        if (!validateEmail(email)) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'El correo no es válido', life: 3000 });
            return;
        }
        if (password.length < 3) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'La contraseña no es válida', life: 3000 });
            return;
        }
        // Si las validaciones pasan
        console.log('Signing in with:', email)
        try {
            const response = await login(email, password);
            if (!response) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Nombre de usuario o contraseña incorrectos', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al iniciar sesión', life: 3000 });
        }
    };

      // Efecto para redirigir según el rol cuando isAuthenticated y userRoles estén actualizados
    useEffect(() => {
        if (isAuthenticated) {
            if (userRoles.includes("administrator")) {
                router.push('/admin/kitchens');
            } else if (userRoles.includes("kitchen")) {
                router.push('/kitchen/order');
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No tienes permisos para acceder', life: 3000 });
            }
        }
    }, [isAuthenticated, userRoles]);

    return ( 
        <div className="flex align-items-center justify-content-center min-h-screen" style={styles.background}>
            <Toast ref={toast} /> {/* Componente para mostrar los mensajes emergentes */}
            <div className="card p-4 shadow-2 border-round lg:w-6" 
                style={styles.card}
            >
                <div className="text-center mb-5">
                    <Image src="/sushi.png" alt="hyper" height={150} className="mb-3" />
                    <div className="text-900 text-4xl font-medium mb-3">Bienvenido a SyntaxFlavor!</div>
                    <span className="text-600 font-medium line-height-3">Inicia tu sesión</span>
                </div>
                <div>
                    <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">Correo electrónico</label>
                    <InputText 
                        id="email" 
                        type="text" 
                        placeholder="SyntaxFlavor@gmail.com" 
                        className="w-full mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el valor del email
                    />

                    <label htmlFor="password" className="block text-900 text-xl font-medium mb-2">Contraseña</label>
                    <InputText 
                        id="password" 
                        type="password" 
                        placeholder="********" 
                        className="w-full mb-3" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el valor de la contraseña
                    />

                    <Button label="Iniciar Sesión" icon="pi pi-user" className="p-button-login w-full" type="submit" onClick={handleLogin} />
                </div>
            </div>
        </div>
    );
};
const styles = {
    background: {
        backgroundImage: `url('/syntax.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        backdropFilter: 'blur(15px)', 
        WebkitBackdropFilter: 'blur(10px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
    }

}
export default LoginForm;
