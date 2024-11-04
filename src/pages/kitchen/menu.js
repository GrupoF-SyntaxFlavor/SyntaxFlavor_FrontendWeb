import React, { useState, useEffect, useRef, useContext } from 'react';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputNumber } from 'primereact/inputnumber';
import withAuth from '@/components/misc/withAuth';
import { Dropdown } from 'primereact/dropdown';
import { MenuContext } from '../../../context/MenuContext';
import MenuItemForm from '@/components/misc/MenuItemForm';


function MenuPage() {
    //contexts
    const { 
        menuItems, 
        loadMenuItems, 
        addMenuItem, 
        changeMenuItemStatus, 
        minPrice,
        setMinPrice, 
        maxPrice,
        setMaxPrice, 
        selectedItemSort,
        setSelectedItemSort, 
        pageNumber, 
        setPageNumber,
        first,
        setFirst,
        rows,
        setRows,
        totalRecords,
    } = useContext(MenuContext);

    const [selectedItem, setSelectedItem] = useState(null); // Ítem seleccionado
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Para saber si es edición o agregar
    const [formValues, setFormValues] = useState({ name: '', description: '', price: null, image: '' });
    
    const toast = useRef(null);
    const itemsSort = [ {name: 'Ascendente', code: 'true'}, {name: 'Descendente', code: 'false'}];

    useEffect(() => {
        loadItems(pageNumber); // Cargar ítems al cambiar la paginación
    }, [minPrice, maxPrice, pageNumber, selectedItemSort]);

    useEffect(() => {
        //console.log("menuItems actualizado:", menuItems);
    }, [menuItems]); 


    const loadItems = async () => {
        try {
            await loadMenuItems();
        } catch (error) {
            console.error('Error loading items:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los ítems', life: 3000 });
        }
    };

    const openDialog = (item = null) => {
        setIsEditMode(!!item); // Si item no es nulo, estamos en modo edición
        setFormValues(item ? { ...item } : { name: '', description: '', price: null, image: '' });
        setDialogVisible(true);
    };

    const handleSave = async () => {
    if (isEditMode) {
        console.log("Editando producto:", formValues);
        // Aquí se podría llamar a una función de edición si se necesita
    } else {
        try {
            await addMenuItem(formValues);
            console.log("Producto agregado exitosamente:", formValues);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto agregado', life: 3000 });

            // Recargar la lista de ítems para reflejar el nuevo producto
            await loadMenuItems();
        } catch (error) {
            console.error('Error adding item:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el producto', life: 3000 });
        }
    }
    setDialogVisible(false);
    };

    const handlePageChange = (event) => {
        setFirst(event.first); // Actualizar la página
        setPageNumber(event.first/rows);
        setRows(event.rows);   // Actualizar la cantidad de filas
    };

    const showConfirmStatusChange = (item, newStatus) => {
        confirmDialog({
        message: `¿Estás seguro de que deseas ${newStatus.toLowerCase()} el ítem ${item.name}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => await handleStatusChange(item, newStatus),
        reject: () => {
            toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Has cancelado la operación', life: 2000 });
        }
        });
    };

    const handleStatusChange = async (item, newStatus) => {
        let updatedStatus;
        if (newStatus === 'Habilitar') {
            updatedStatus = true;
        } else if (newStatus === 'Deshabilitar') {
            updatedStatus = false;
        } else {
            updatedStatus = false; //fallback
        }

        await changeMenuItemStatus(item.id, updatedStatus);
        if (toast.current) {
            toast.current.show({ severity: 'success', summary: newStatus, detail: `El ítem ${item.name} ha sido ${newStatus.toLowerCase()}`, life: 3000 });
        }
    };

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
                    style={{...styles.enableButton}}
                    onClick={() => showConfirmStatusChange(option, 'Habilitar')}
                />
            )}
        </div>
    );
    
    // Actualización de itemTemplate para utilizar actionButtonsTemplate
    const itemTemplate = (option) => {
        return (
            <div 
                className="p-ai-center p-jc-between" 
                style={option.status ? styles.item : styles.disabledItem}
            >
                <div className="p-ai-center" style={styles.itemContent}>
                    <img src={option.image} alt={option.name} style={styles.image} />
                    <div className="p-ml-3 p-4">
                        <div style={styles.label}>{option.name}</div>
                        <div style={styles.description}>{option.description}</div>
                        <div style={styles.price}>Precio: Bs. {option.price}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <KitchenSiderBar>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div>
                <div style={styles.container}>
                    <div style={{ ...styles.listContainer, flex: selectedItem ? 2 : 1 }}>
                        <Card title="Productos del Menú"></Card>
                        <br />
                        {/* empieza el filtro */}
                        <div>
                            <Card className="flex align-items-center gap-2 mb-3">
                                <div style={styles.filterContainer}>
                                    <div style={styles.priceGroup}>
                                        {/* Input para mínimo precio */}
                                        <div className="flex align-items-center">
                                            <label htmlFor="minPrice" className="mr-2">Min Precio:</label>
                                            <InputNumber id="minPrice" value={minPrice} onValueChange={(e) => setMinPrice(e.value)} placeholder="0.00" />
                                        </div>
                                        
                                        {/* Input para máximo precio */}
                                        <div className="flex align-items-center">
                                            <label htmlFor="maxPrice" className="mr-2">Max Precio:</label>
                                            <InputNumber id="maxPrice" value={maxPrice} onValueChange={(e) => setMaxPrice(e.value)} placeholder="100.00" />
                                        </div>

                                        {/* Dropdown para selección de orden */}
                                        <label htmlFor="sort" className="mr-2">Ordenar por nombre:</label>
                                        <Dropdown id="sort" className="flex align-items-center" value={selectedItemSort} onChange={(e) => setSelectedItemSort(e.value)} options={itemsSort} optionLabel="name" optionValue="code" placeholder="Ascendente por nombre" />

                                    </div>     
                                </div>
                            </Card>
                        </div>
                        {/* termina el filtro */}
                        <br />
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
                                style={{ textAlign: 'right', width: '100px' }} // Alineación a la derecha para toda la columna
                            />
                        </DataTable>
                        <br />
                    </div>
                    {/* Formulario que aparece al seleccionar un item */}
                    {/* Detalles del ítem seleccionado */}
                    <div style={{ ...styles.formContainer, display: selectedItem ? 'block' : 'none' }}>
                        {selectedItem && (
                            <div>
                                <Card title={`Detalles de ${selectedItem.name}`} style={styles.detailCard}></Card>
                                <br />  
                                <Card>
                                    <img src={selectedItem.image} alt={selectedItem.name} style={styles.largeImage} />
                                    <p><strong>Descripción:</strong> {selectedItem.description}</p>
                                    <p><strong>Precio:</strong> {selectedItem.price} Bs.</p>
                                    <p><strong>Estado:</strong> {selectedItem.status?"Habilitado":"Deshabilitado"}</p>
                                    {/* <p><strong>Fecha de creación:</strong> {new Date(selectedItem.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Última actualización:</strong> {new Date(selectedItem.updatedAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             {/* Modal para agregar/editar */}
             <MenuItemForm
                isVisible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                isEditMode={isEditMode}
                formValues={formValues}
                setFormValues={setFormValues}
                handleSave={handleSave}
            />
        </KitchenSiderBar>
    );
}
// TODO: Mover a un archivo de estilos
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '18px',
        borderRadius: '10px',
        gap: '1rem',
        height: '100%',
    },
    listContainer: {
        //flex: selectedItem ? 2 : 1,
        // transition: 'flex 0.3s ease',
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',  // Adjust to align content horizontally
        gap: '10px',  // Add some space between the elements if necessary
    },
    priceGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',  // Ensure sufficient space between radio buttons
    },
    formContainer: {
        flex: 1,
        //display: selectedItem ? 'block' : 'none',
        // transition: 'flex 0.3s ease',
    },
    panel: {
        height: '100%',
    },
    image: {
        width: '5.5rem',
        height: '5.5rem',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    largeImage: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    item: {
        // padding: '0.5rem',
        // borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        //justifyContent: 'space-between',
        alignItems: 'center',
    },
    disabledItem: {
        opacity: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
    },
    itemContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
        width: '1000%',
    },
    label: {
        fontWeight: 'bold',
        // fontSize: '1rem',
    },
    description: {
        color: '#6c757d',
        // fontSize: '0.85rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    },
    price: {
        marginTop: '0.25rem',
        color: '#000',
        // fontSize: '0.9rem',
    },
    enableButton: {
        width: '150px',
        marginLeft: 'auto',
        marginRight: '2px',
        marginBottom: '2px'
    },
    buttonPosition:{
        paddingTop: '3rem',
        paddingRight: '1rem',
    },
    //add-ons and Modal
    addButton:{
        width: '150px',
    },
};

export default withAuth(MenuPage);