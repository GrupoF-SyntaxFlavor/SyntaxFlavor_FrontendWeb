import Image from 'next/image';
import React from 'react';

const ResourceNotFound = () => (
    <div style={styles.container}>
        <Image 
            src="/resource-not-found.gif" // Ruta correcta sin "/public/"
            alt="Recurso No Encontrado, lo sentimos" 
            width={480} 
            height={360}
        />
        <p style={styles.message}>Recurso no encontrado, lo sentimos</p> 
    </div>
);

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
    },
    message: {
        marginTop: '10px',
        fontSize: '16px',
        color: '#555',
    },
};

export default ResourceNotFound;
