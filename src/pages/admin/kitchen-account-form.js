import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/router";
import { Card } from 'primereact/card';  // Asegúrate de tener instalado PrimeReact y la Card
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import style from "styled-jsx/style";


export default function KitchenAccountForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);  // Estado para mostrar/ocultar contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Estado para mostrar/ocultar confirmación

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Lógica para crear una cuenta aquí, por ejemplo, llamar a la API
        // Enviar los datos al servidor
        console.log({
            email,
            name,
            password,
        });

        // Redirigir al listado de usuarios después de crear la cuenta
        router.push("/admin/kitchens");
    };

    return (
        <AdminSidebar>
            <div style={styles.container}>
                <Card header={<h2 style={styles.cardTitle}>Crear Cuenta de Cocina</h2>} style={styles.card}>
                    {error && <p style={styles.error}>{error}</p>}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                       <div style={styles.formGroup}>
                            <label>Contraseña</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}  // Cambia entre 'text' y 'password'
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                                <FontAwesomeIcon 
                                    icon={showPassword ? faEyeSlash : faEye}  // Ojo o ojo tachado
                                    style={styles.eyeIcon} 
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label>Confirmar Contraseña</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}  // Cambia entre 'text' y 'password'
                                    placeholder="Confirmar contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                                <FontAwesomeIcon 
                                    icon={showConfirmPassword ? faEyeSlash : faEye}  // Ojo o ojo tachado
                                    style={styles.eyeIcon} 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>
                        </div>
                        <button type="submit" style={styles.submitButton}>Crear Cuenta</button>
                    </form>
                </Card>
            </div>
        </AdminSidebar>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
    },
    card: {
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Estilo de sombra para la tarjeta
        borderRadius: "20px",  // Redondea las esquinas de la tarjeta
        
    },
    cardTitle: {
        textAlign: "center",
        margin: 0,  
        fontSize: "30px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
    },
    formGroup: {
        marginBottom: "20px",
        fontSize: "18px",

    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "18px",
    },
    passwordContainer: {
        display: "flex",
        alignItems: "center",
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: "10px",
        cursor: "pointer",
        fontSize: "20px",
        color: "#666",
    },
    submitButton: {
        margin: "0 auto",
        width: "80%",
        height: "50px",
        backgroundColor: "#86AB9A",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "20px",
    },
    error: {
        color: "red",
        marginBottom: "15px",
    },
};
