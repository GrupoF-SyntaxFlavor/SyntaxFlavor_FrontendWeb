import React from 'react';
import { Card } from 'primereact/card';

export default function UserDetails({ user }) {
    return (
        <div>
            <Card title={user.username} style={styles.container}>
                <p><strong>Correo electrónico:</strong> {user.email}</p>
                <p><strong>Ubicación:</strong> {user.location}</p>
            </Card>
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        borderLeft: '3px solid #ccc',
        paddingLeft: '2.5vh',
        marginBottom: '1vh',
    },
};