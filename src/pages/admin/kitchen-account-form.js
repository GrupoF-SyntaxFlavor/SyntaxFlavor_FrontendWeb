import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/router";
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import withAuth from "@/components/misc/withAuth";
import AdminService from "@/service/AdminService";

function KitchenAccountForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);  // Estado para mostrar/ocultar contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Estado para mostrar/ocultar confirmación
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);  // Estado para mostrar el mensaje de confirmación

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
    
        try {
            const adminService = new AdminService();
            await adminService.signupKitchen(name, email, password, location);
    
            // Mostrar mensaje de confirmación después de enviar los datos
            setShowConfirmationMessage(true);
    
            // Redirigir al listado de usuarios después de un pequeño retraso
            setTimeout(() => {
                router.push("/admin/kitchens");
            }, 3000); // Redirige después de 3 segundos
        } catch (error) {
            setError("Error al crear la cuenta de cocina");
            console.error("Signup error", error);
        }
    };
    

    const handleBack = () => {
        router.back();  // Volver a la página anterior
    };

    return (
        <AdminSidebar>
            <div style={styles.container}>
                <Card header={<h2 style={styles.cardTitle}>Crear Cuenta de Cocina</h2>} style={styles.card}>
                    {error && <p style={styles.error}>{error}</p>}
                    {showConfirmationMessage ? (
                        <p style={styles.confirmationMessage}>
                            Se ha enviado un correo a {email}. Por favor, confirma tu cuenta para poder utilizarla sin problemas.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label htmlFor="name">Nombre</label>
                                <InputText
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full"
                                    type="text"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="email">Correo electrónico</label>
                                <InputText
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="location">Ubicación</label> {/* New location input */}
                                <select
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="w-full p-inputtext p-component"
                                    style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ced4da" }}
                                >
                                    <option value="">Seleccione una ubicación</option>
                                    <option value="location1">Local 1</option>
                                    <option value="location2">Local 2</option>
                                    <option value="location3">Local 3</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="password">Contraseña</label>
                                <div style={styles.passwordContainer}>
                                    <InputText
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full"
                                        style={{ paddingRight: "2.5rem" }}
                                        placeholder="Contraseña"
                                    />
                                    <FontAwesomeIcon 
                                        icon={showPassword ? faEyeSlash : faEye}
                                        style={styles.eyeIcon} 
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <div style={styles.passwordContainer}>
                                    <InputText
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full"
                                        style={{ paddingRight: "2.5rem" }}
                                        placeholder="Confirmar Contraseña"
                                    />
                                    <FontAwesomeIcon 
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                        style={styles.eyeIcon} 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>
                            </div>
                            <Button type="submit" label="Crear Cuenta" className="p-button-success mt-2" style={styles.submitButton} />
                            <Button label="Atrás" className="p-button-secondary mt-2" style={styles.backButton} onClick={handleBack} />
                        </form>
                    )}
                    
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
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
    },
    cardTitle: {
        textAlign: "center",
        margin: 0,
        fontSize: "30px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "20px",
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
        color: "#666",
    },
    submitButton: {
        margin: "0 auto",
        width: "80%",
        height: "50px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "20px",
    },
    backButton: {
        margin: "0 auto",
        width: "80%",
        height: "50px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "20px",
    },
    error: {
        color: "red",
        marginBottom: "15px",
    },
    confirmationMessage: {
        color: "green",
        fontSize: "18px",
        textAlign: "center",
    },
};

export default withAuth(KitchenAccountForm);