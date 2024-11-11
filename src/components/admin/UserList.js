import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { pad } from 'lodash';

const UserList = ({ 
    kitchenUsers, 
    // onPaginate, 
    page, 
    rows, 
    first,
    totalRecords,
    handlePageChange,
    // loading 
}) => {
    console.log('kitchenUsers:', kitchenUsers);
    // console.log('onPaginate:', onPaginate);
    console.log('page:', page);
    console.log('rows:', rows);
    // console.log('loading:', loading);

    // const addIndexToUsers = kitchenUsers.map((user, index) => ({ ...user, index: index + 1 }));

    return (
        <div style={styles.container}>
            <DataTable 
                value={kitchenUsers}
                // paginator
                // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                dataKey="id" //TODO:
                paginator={true}
                rows={rows}
                first={first}
                totalRecords={totalRecords}
                onPage={handlePageChange}
                lazy={true}
                // loading={loading}
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

export default UserList;