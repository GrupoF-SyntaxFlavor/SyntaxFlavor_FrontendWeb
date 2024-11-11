// MenuList.js
import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { formatImageUrl } from '../../../util/formatImageUtils';

const MenuList = ({
    menuItems,
    selectedItem,
    setSelectedItem,
    rows,
    first,
    totalRecords,
    handlePageChange,
    openDialog,
    showConfirmStatusChange
}) => {
    const toast = useRef(null);

    const actionButtonsTemplate = (option) => (
        <div style={styles.buttonPosition}>
            <Button
                label="Editar"
                icon="pi pi-pencil"
                className="p-button-info"
                size="small"
                style={styles.enableButton}
                onClick={() => openDialog(option)} // Abre el modal en modo edición
            />
            {option.status ? (
                <Button
                    label="Deshabilitar"
                    icon="pi pi-times"
                    className="p-button-danger"
                    size="small"
                    style={styles.enableButton}
                    onClick={() => showConfirmStatusChange(option, 'Deshabilitar')}
                />
            ) : (
                <Button
                    label="Habilitar"
                    icon="pi pi-check"
                    className="p-button-success"
                    size="small"
                    style={{ ...styles.enableButton }}
                    onClick={() => showConfirmStatusChange(option, 'Habilitar')}
                />
            )}
        </div>
    );

    const itemTemplate = (option) => (
        <div className="p-ai-center p-jc-between" style={option.status ? styles.item : styles.disabledItem}>
            <div className="p-ai-center" style={styles.itemContent}>
                <img src={formatImageUrl(option.image)} alt={option.name} style={styles.image} />
                <div className="p-ml-3 p-4">
                    <div style={styles.label}>{option.name}</div>
                    <div style={styles.description}>{option.description}</div>
                    <div style={styles.price}>Precio: Bs. {option.price}</div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable
                value={menuItems}
                selectionMode="single"
                selection={selectedItem}
                onSelectionChange={(e) => setSelectedItem(e.value)}
                dataKey="id"
                paginator={true}
                rows={rows}
                first={first}
                totalRecords={totalRecords}
                onPage={handlePageChange}
                lazy={true}
            >
                <Column header="#" body={(_, options) => options.rowIndex + 1} style={{ textAlign: 'center' }} />
                <Column field="name" header="Nombre" body={itemTemplate} />
                <Column
                    header={
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                icon="pi pi-plus"
                                className="p-button-success"
                                label="Agregar"
                                onClick={() => openDialog()}
                                style={styles.addButton}
                            />
                        </div>
                    }
                    body={(rowData) => actionButtonsTemplate(rowData)}
                    style={{ textAlign: 'right', width: '100px' }}
                />
            </DataTable>
        </>
    );
};

// Añade tus estilos aquí o importarlos
const styles = {
    buttonPosition: { 
        paddingTop: '3rem', 
        paddingRight: '1rem' 
    },
    enableButton: {
        width: '150px', 
        marginLeft: 'auto', 
        marginRight: '2px', 
        marginBottom: '2px' 
    },
    item: { 
        display: 'flex', 
        alignItems: 'center' 
    },
    disabledItem: { 
        opacity: 0.5, 
        display: 'flex', 
        justifyContent: 'space-between' 
    },
    itemContent: { 
        display: 'flex', 
        alignItems: 'center', 
        flex: 1, 
        overflow: 'hidden', 
        width: '1000%' },
    label: { 
        fontWeight: 'bold' 
    },
    description: { 
        color: '#6c757d', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'normal', 
        wordWrap: 'break-word' 
    },
    price: { 
        marginTop: '0.25rem', 
        color: '#000' 
    },
    image: { 
        width: '5.5rem', 
        height: '5.5rem', 
        objectFit: 'cover', 
        borderRadius: '50%' 
    },
    addButton: { 
        width: '150px' 
    },
};
export default MenuList;