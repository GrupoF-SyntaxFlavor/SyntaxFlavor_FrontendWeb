import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { pad } from 'lodash';

export default function UserList({ users, onPaginate, page, rows, loading }) {
    console.log('users:', users);
    console.log('onPaginate:', onPaginate);
    console.log('page:', page);
    console.log('rows:', rows);
    console.log('loading:', loading);

    const addIndexToUsers = users.map((user, index) => ({ ...user, index: index + 1 }));

    return (
        <div style={styles.container}>
            <DataTable value={users}
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={rows}
                totalRecords={100} // Este valor debería provenir del backend
                first={page * rows}
                onPage={onPaginate}
                loading={loading}
            >
                <Column field="index" header="#" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader}/>
                <Column field="name" header="Nombre de usuario" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader}/>
                <Column field="email" header="Correo electrónico" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader}/>
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