import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { pad } from 'lodash';

export default function UserList({ users }) {

    const addIndexToUsers = users.map((user, index) => ({ ...user, index: index + 1 }));

    return (
        <div style={styles.container}>
            <DataTable
                value={addIndexToUsers}
                // className="p-datatable-sm"
                paginator={true}
                rows={10}
            >
                <Column field="index" header="#" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} />
                <Column field="username" header="Nombre de usuario" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} />
                <Column field="email" header="Correo electrónico" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} />
                <Column field="location" header="Ubicación" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} />

            </DataTable>
        </div>
    );
}

const styles = {
    container: {
        alignItems: "center",
        // padding: "20px",
    },
    tableRow: {
        // aumentar el largo de la columna
        padding: "1.5vh",
        // fontSize: "22px",
    },
    tableHeader: {
        // fontSize: "24px",
        // fontWeight: "bold",
    },
};