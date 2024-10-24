import React, { useState, useEffect, useRef } from 'react';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import withAuth from '@/components/misc/withAuth';
import MenuService from '@/service/MenuService';
import { Image } from 'primereact/image';

function MenuPage() {
    const [items, setItems] = useState([]); // Datos de los ítems
    const [selectedItem, setSelectedItem] = useState(null); // Ítem seleccionado
    const [first, setFirst] = useState(0); // Control de la paginación (inicio)
    const [rows, setRows] = useState(10); // Cantidad de filas por página
    const [totalRecords, setTotalRecords] = useState(0); // Total de registros para la paginación
    const toast = useRef(null);

    const menuService = new MenuService();

    useEffect(() => {
        loadItems(first / rows); // Cargar ítems al cambiar la paginación
    }, [first, rows]);

    const loadItems = async (pageNumber) => {
        try {
            // Aquí se hace la llamada para obtener los ítems del menú
            // Ejemplo: const data = await menuService.getItems(pageNumber, rows);
            //FIXME: Basarse en order.js en loadOrders
            //FIXME del FIXME: Utilizar un context:: context\MenuContext.js
            const data = { 
                content: [
                    { id: 1, label: 'Pizza Margherita', description: 'Clásica pizza con queso y albahaca.', price: '10.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Deshabilitado', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z' },
                    { id: 2, label: 'Hamburguesa Especial', description: 'Jugosa hamburguesa con ingredientes frescosJugosa hamburguesa con ingredientes frescos Jugosa hamburguesa con ingredientes frescos Jugosa hamburguesa con ingredientes frescos.', price: '8.99', image: 'https://norecipes.com/wp-content/uploads/2023/09/salmon-onigiri-002.jpg', status: 'Habilitado', createdAt: '2023-10-02T12:00:00Z', updatedAt: '2023-10-02T12:00:00Z'  },
                    { id: 3, label: 'Ensalada César', description: 'Ensalada con pollo, lechuga y aderezo césar.', price: '6.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-03T12:00:00Z', updatedAt: '2023-10-03T12:00:00Z'  },
                    { id: 4, label: 'Papas Fritas', description: 'Papas fritas crujientes y doradas.', price: '3.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Deshabilitado', createdAt: '2023-10-04T12:00:00Z', updatedAt: '2023-10-04T12:00:00Z'  },
                    { id: 5, label: 'Refresco', description: 'Refresco frío de cola o limón.', price: '1.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-05T12:00:00Z', updatedAt: '2023-10-05T12:00:00Z'  },
                    { id: 6, label: 'Helado', description: 'Helado de vainilla con chispas de chocolate.', price: '4.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Deshabilitado', createdAt: '2023-10-06T12:00:00Z', updatedAt: '2023-10-06T12:00:00Z'  },
                    { id: 7, label: 'Tacos de Carne', description: 'Tacos de carne asada con guacamole.', price: '9.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Deshabilitado', createdAt: '2023-10-07T12:00:00Z', updatedAt: '2023-10-07T12:00:00Z'  },
                    { id: 8, label: 'Sopa de Verduras', description: 'Sopa caliente de verduras frescas.', price: '5.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Deshabilitado', createdAt: '2023-10-08T12:00:00Z', updatedAt: '2023-10-08T12:00:00Z'  },
                    { id: 9, label: 'Pastel de Chocolate', description: 'Pastel de chocolate con crema batida.', price: '7.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-09T12:00:00Z', updatedAt: '2023-10-09T12:00:00Z'  },
                    
                    { id: 10, label: 'Tacos de Carne', description: 'Tacos de carne asada con guacamole.', price: '9.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-10T12:00:00Z', updatedAt: '2023-10-10T12:00:00Z'  },
                    { id: 11, label: 'Sopa de Verduras', description: 'Sopa caliente de verduras frescas.', price: '5.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-11T12:00:00Z', updatedAt: '2023-10-11T12:00:00Z'  },
                    { id: 12, label: 'Pastel de Chocolate', description: 'Pastel de chocolate con crema batida.', price: '7.99', image: 'https://mejoresrecetas.me/wp-content/uploads/2024/07/onigiri.webp', status: 'Habilitado', createdAt: '2023-10-12T12:00:00Z', updatedAt: '2023-10-12T12:00:00Z'  },
                ],
                totalElements: 12,
            };
            setItems(data.content);
            setTotalRecords(data.totalElements);
        } catch (error) {
            console.error('Error loading items:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los ítems', life: 3000 });
        }
    };

    const handlePageChange = (event) => {
        setFirst(event.first); // Actualizar la página
        setRows(event.rows);   // Actualizar la cantidad de filas
    };

    const showConfirmStatusChange = (item, newStatus) => {
        confirmDialog({
        message: `¿Estás seguro de que deseas ${newStatus.toLowerCase()} el ítem ${item.label}?`,
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

        const updatedItems = items.map((i) =>
            i.id === item.id ? { ...i, status: updatedStatus } : i
        );
        setItems(updatedItems);
        toast.current.show({ severity: 'success', summary: newStatus, detail: `El ítem ${item.label} ha sido ${newStatus.toLowerCase()}`, life: 3000 });
    };

    const itemTemplate = (option) => {
        return (
            <div className="p-ai-center p-jc-between" style={styles.item}>
            <div className="p-ai-center" style={styles.itemContent}>
                <img src={option.image} alt={option.label} style={styles.image} />
                <div className="p-ml-3 p-4">
                <div style={styles.label}>{option.label}</div>
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
                        <DataTable
                            value={items}
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
                            <Column field="label" header="Nombre" body={itemTemplate} />
                        </DataTable>
                        <br />
                    </div>
                    {/* Formulario que aparece al seleccionar un item */}
                    {/* Detalles del ítem seleccionado */}
                    <div style={styles.formContainer}>
                        
                        {selectedItem && (
                            <div>
                                <Card title={`Detalles de ${selectedItem.label}`} style={styles.detailCard}></Card>
                                <br />  
                                <Card>
                                    <Image src={selectedItem.image} alt={selectedItem.label} style={styles.largeImage} />
                                    <p><strong>Descripción:</strong> {selectedItem.description}</p>
                                    <p><strong>Precio:</strong> ${selectedItem.price}</p>
                                    <p><strong>Estado:</strong> {selectedItem.status}</p>
                                    <p><strong>Fecha de creación:</strong> {new Date(selectedItem.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Última actualización:</strong> {new Date(selectedItem.updatedAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    {/* TODO: I'll handle this later @AleCar
                                    <Button 
                                        label={selectedItem.status === 'Habilitado' ? 'Deshabilitar' : 'Habilitar'} 
                                        icon={selectedItem.status === 'Habilitado' ? 'pi pi-times' : 'pi pi-check'} 
                                        className={selectedItem.status === 'Habilitado' ? 'p-button-danger' : 'p-button-success'}
                                        onClick={() => handleItemStatusChange(selectedItem)}
                                    /> */}
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