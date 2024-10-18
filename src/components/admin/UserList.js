import React from 'react';
import UserDetails from './UserDetails';

export default function UserList({ users }) {
    return (
        <div>
            <h1>Usuarios</h1>
            <div style={styles.container}>
                {users.map((user, index) => (
                    <UserDetails user={user} key={index} />
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
};