import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function UserList({ users }) {

    const addIndexToUsers = users.map((user, index) => ({ ...user, index: index + 1 }));

    return (
        <div>
            <h1>Usuarios</h1>
            <DataTable
                value={addIndexToUsers}
                className="p-datatable-sm"
                paginator
                rows={10}
            >
                <Column field="index" header="#" />
                <Column field="username" header="Nombre de usuario" />
                <Column field="email" header="Correo electrónico" />
                <Column field="location" header="Ubicación" />

            </DataTable>
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