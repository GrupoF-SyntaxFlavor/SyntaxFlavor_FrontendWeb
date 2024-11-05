// MenuItemSelected.js
import React from 'react';
import { Card } from 'primereact/card';

const MenuItemSelected = ({ selectedItem }) => {
    if (!selectedItem) return null;

    return (
        <div>
            <Card title={`Detalles de ${selectedItem.name}`} style={styles.detailCard}></Card>
            <br />  
            <Card>
                <img src={selectedItem.image} alt={selectedItem.name} style={styles.largeImage} />
                <p><strong>Descripción:</strong> {selectedItem.description}</p>
                <p><strong>Precio:</strong> {selectedItem.price} Bs.</p>
                <p><strong>Estado:</strong> {selectedItem.status ? "Habilitado" : "Deshabilitado"}</p>
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
