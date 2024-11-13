// MenuItemSelected.js
import React, { useState, useContext , useRef, useEffect} from 'react';
import { AuthContext } from '../../../context/AuthContext'; 
import { Card } from 'primereact/card';
import { MenuContext } from '../../../context/MenuContext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

const MenuItemSelected = ({ selectedItem }) => {
    const { userRoles } = useContext(AuthContext); // Accede a los roles del usuario desde el contexto
    const { deleteMenuItem } = useContext(MenuContext);
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedItem && selectedItem.image) {
            setImageUrl(selectedItem.image); // Establece la URL de la imagen
            console.log("Selected Item:", selectedItem);
        }
    }, [selectedItem]); // Vuelve a ejecutar cuando `selectedItem` cambia

    if (!selectedItem) return null;

    const showConfirmDialog = () => {
        setVisible(true);
    };

    const onConfirm = async () => {
        setVisible(false);
        // Llamar a la función que maneja el consumo del endpoint
        await handleDeleteMenuItem();
    };

    const onCancel = () => {
        setVisible(false);
    };

    const handleDeleteMenuItem = async () => {
        const response = await deleteMenuItem(selectedItem.id);

        if (response == 200) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Elemento del menú eliminado', life: 3000 });
            return null;
        } else if(response==409) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No puede eliminar elementos del menú relacionados a órdenes', life: 3000 });
        } else{
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el elemento del menú', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={onCancel}
                message="¿Estás seguro de que deseas eliminar este platillo?"
                header="Confirmación"
                icon="pi pi-exclamation-triangle"
                accept={onConfirm}
                reject={onCancel}
            />
            <Card title={`Detalles de ${selectedItem.name}`} style={styles.detailCard}></Card>
            <br />  
            <Card>
                {imageUrl ? (
                    <img src={imageUrl} alt={selectedItem.name} style={styles.largeImage} onError={(e) => e.target.style.display = 'none'} />
                ) : (
                    <p>Cargando imagen...</p>
                )}
                {/* <img src={selectedItem.image} alt={selectedItem.name} style={styles.largeImage} /> */}
                <p><strong>Descripción:</strong> {selectedItem.description}</p>
                <p><strong>Precio:</strong> {selectedItem.price} Bs.</p>
                <p><strong>Estado:</strong> {selectedItem.status ? "Habilitado" : "Deshabilitado"}</p>
                {userRoles.includes('administrator') && (
                    <>
                        <Button
                            label="Eliminar"
                            icon="pi pi-trash"
                            className="p-button-danger"
                            size="small"
                            style={styles.enableButton}
                            onClick={() => showConfirmDialog()}
                        />
                    </>
                )}
            </Card>
        </div>
    );
};

// Estilos específicos para el componente de detalles
const styles = {
    detailCard: {
        marginBottom: '1rem',
    },
    largeImage: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
};

export default MenuItemSelected;
