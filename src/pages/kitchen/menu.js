import React, { useState, useEffect, useRef, useContext } from 'react';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import withAuth from '@/components/misc/withAuth';
import MenuService from '@/service/MenuService';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { AuthContext } from '../../../context/AuthContext';
import { MenuContext } from '../../../context/MenuContext';

function MenuPage() {
    //contexts
    const { authToken } = useContext(AuthContext);
    const { menuItems, addMenuItem, setMenuItems } = useContext(MenuContext);
    //se pueden borrar
    const [items, setItems] = useState([]); // Datos de los ítems

    const [selectedItem, setSelectedItem] = useState(null); // Ítem seleccionado

    const [first, setFirst] = useState(0); // Control de la paginación (inicio)
    const [rows, setRows] = useState(10); // Cantidad de filas por página


    const [totalRecords, setTotalRecords] = useState(0); // Total de registros para la paginación
    const [isLastPage, setIsLastPage] = useState(false);  // Bandera para saber si estamos en la última página
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [selectedItemSort, setSelectedItemSort] = useState('true');
    const [pageNumber, setPageNumber] = useState(0);
    const toast = useRef(null);
    const itemsSort = [ {name: 'Ascendente', code: 'true'}, {name: 'Descendente', code: 'false'}];

    const menuService = new MenuService();

    useEffect(() => {
        loadItems(pageNumber); // Cargar ítems al cambiar la paginación
    }, [minPrice, maxPrice, pageNumber, selectedItemSort]);
    
    useEffect(() => {
        console.log("menuItems actualizado:", menuItems);
    }, [menuItems]); 


    const loadItems = async (pageNumber) => {
        try {
            
            const data= await menuService.getMenuItems(minPrice, maxPrice, pageNumber, rows, selectedItemSort, authToken);
            setMenuItems([]);
            data.content.forEach((item) => {
                addMenuItem(item); // Usa la función del contexto para agregar ítems
            });
            //mostrando el contenido de menuItems

            console.log("menuItems: " + menuItems );
            //obteniendo datos importantes de pageable
            data.last
            console.log("total elements: ",data.totalElements);
            setTotalRecords(data.totalElements);
            if(data.first){
                setFirst(0);
            }
        } catch (error) {
            console.error('Error loading items:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los ítems', life: 3000 });
        }
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
        accept: () => handleStatusChange(item, newStatus),
        reject: () => {
            toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Has cancelado la operación', life: 2000 });
        }
        });
    };

    const handleStatusChange = (item, newStatus) => {
        let updatedStatus;
        if (newStatus === 'Habilitar') {
            updatedStatus = 'Habilitado';
        } else if (newStatus === 'Deshabilitar') {
            updatedStatus = 'Deshabilitado';
        } else {
            updatedStatus = newStatus; // Default case if there are more states
        }

        const updatedItems = menuItems.map((i) =>
            i.id === item.id ? { ...i, status: updatedStatus } : i
        );
        setItems(updatedItems);//TODO: cambiar esto por setMenuItems
        toast.current.show({ severity: 'success', summary: newStatus, detail: `El ítem ${item.name} ha sido ${newStatus.toLowerCase()}`, life: 3000 });
    };

    const itemTemplate = (option) => {
        return (
            <div className="p-ai-center p-jc-between" style={styles.item}>
            <div className="p-ai-center" style={styles.itemContent}>
                <img src={option.image} alt={option.name} style={styles.image} />
                <div className="p-ml-3 p-4">
                <div style={styles.label}>{option.name}</div>
                <div style={styles.description}>{option.description}</div>
                <div style={styles.price}>Precio: Bs. {option.price}</div>
                </div>
            </div>
            <div style={styles.buttonPosition}>
                <Button 
                label="Habilitar" 
                icon="pi pi-check" 
                className="p-button-success"
                size="small"     
                style={{...styles.enableButton, marginRight: '0.5rem'}}
                onClick={() => showConfirmStatusChange(option, 'Habilitar')}
                disabled={option.status === 'Habilitado'} // Deshabilitado si ya está habilitado
                />
                <Button 
                label="Deshabilitar" 
                icon="pi pi-times" 
                className="p-button-danger"
                size="small"     
                style={styles.enableButton}
                onClick={() => showConfirmStatusChange(option, 'Deshabilitar')}
                disabled={option.status === 'Deshabilitado'} // Deshabilitado si ya está deshabilitado
                />
            </div>
            </div>
        );
    };


    // Styles para el componente // TODO: Mover a un archivo de estilos
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
            flex: selectedItem ? 2 : 1,
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
            display: selectedItem ? 'block' : 'none',
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
            marginLeft: 'auto',
        },
        buttonPosition:{
            paddingTop: '3rem',
            paddingRight: '1rem',
        }
    };


    return (
        <KitchenSiderBar>
            <Toast ref={toast} />
            <ConfirmDialog />

            <div>
                <div style={styles.container}>
                    <div style={styles.listContainer}>
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
                        </DataTable>
                        <br />
                    </div>
                    {/* Formulario que aparece al seleccionar un item */}
                    {/* Detalles del ítem seleccionado */}
                    <div style={styles.formContainer}>

                        {selectedItem && (
                            <div>
                                <Card title={`Detalles de ${selectedItem.name}`} style={styles.detailCard}></Card>
                                <br />  
                                <Card>
                                    <img src={selectedItem.image} alt={selectedItem.name} style={styles.largeImage} />
                                    <p><strong>Descripción:</strong> {selectedItem.description}</p>
                                    <p><strong>Precio:</strong> {selectedItem.price} Bs.</p>
                                    <p><strong>Estado:</strong> {selectedItem.status}</p>
                                    <p><strong>Fecha de creación:</strong> {new Date(selectedItem.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Última actualización:</strong> {new Date(selectedItem.updatedAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </KitchenSiderBar>
    );
}

export default withAuth(MenuPage);