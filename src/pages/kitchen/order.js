import React, { useState, useEffect, useRef } from 'react';
import OrderDetails from '@/components/kitchen/OrderDetails.js';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import OrderService from '@/service/OrderService';
import style from 'styled-jsx/style';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);  // Almacena las órdenes desde el backend
    const [selectedOrder, setSelectedOrder] = useState(null);  // Almacena la orden seleccionada
    const [first, setFirst] = useState(0);  // Control de paginación (inicio)
    const [rows, setRows] = useState(10);  // Cantidad de filas por página
    const [totalRecords, setTotalRecords] = useState(0);  // Número total de registros
    const [loading, setLoading] = useState(false);  // Control de carga
    const [error, setError] = useState(null);  // Almacena el error si ocurre
    const [isLastPage, setIsLastPage] = useState(false);  // Bandera para saber si estamos en la última página
    let pollingInterval = null;  // Variable para almacenar el intervalo del polling

    const orderService = new OrderService(); 
    const toast = useRef(null);

    useEffect(() => {
        loadOrders(first / rows);  // Cargamos las órdenes cuando cambia la paginación
    }, [first, rows]);

    useEffect(() => {
        // Si estamos en la última página, iniciamos el polling
        if (isLastPage) {
            pollingInterval = setInterval(() => {
                console.log('Polling on last page...');
                loadOrders(first / rows);
            }, 10000);  // Polling cada 10 segundos

            // Limpiamos el intervalo al salir de la última página o cuando el componente se desmonte
            return () => clearInterval(pollingInterval);
        } else {
            // Si no estamos en la última página, limpiar cualquier intervalo de polling
            clearInterval(pollingInterval);
        }
    }, [isLastPage, first, rows]);

    const loadOrders = async (pageNumber) => {
        setLoading(true);
        try {
            // const data = await orderService.getOrders(pageNumber, rows);
            const data = await orderService.getOrdersByStatus('Pendiente',pageNumber); 
            // Evitar re-renderizar si no hay cambios en los datos
            if (JSON.stringify(data.content) !== JSON.stringify(orders)) {
                setOrders(data.content);  // Solo actualizar si los datos son diferentes
            }
            setTotalRecords(data.totalElements);  // Total de registros para la paginación

            // Verificar si estamos en la última página
            const isLastPageCheck = first + rows >= data.totalElements;
            setIsLastPage(isLastPageCheck);

            setError(null);  // Limpiamos cualquier error previo
        } catch (err) {
            setError('Error loading orders: ' + err.message);
        } finally {
            setLoading(false);  // Terminamos la carga
        }
        //console.log('Orders loaded:', orders);
    };

    const handlePageChange = (event) => {
        setFirst(event.first);  // Actualizamos el primer registro visible
        setRows(event.rows);    // Actualizamos el número de registros visibles por página
    };

    const handleCompleteOrder = async (orderId) => {
        setLoading(true);
        try {
            const result = await orderService.completeOrder(orderId);
            if (result.responseCode == 'ORD-003') {
                // const updatedOrders = orders.filter(order => order.orderId !== orderId);
                // setOrders(updatedOrders);  // Actualiza el estado removiendo la orden cancelada
                const newFirst = (orders.length === 1 && first > 0) ? first - rows : first;  // Ajusta 'first' si la página quedará vacía
                await loadOrders(newFirst / rows);  // Recarga las órdenes después de eliminar una
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Orden completada exitosamente', life: 2000 });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error canceling the order:', error);
            setError('Error al completar la orden: ' + error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message || 'Error completando la orden', life: 5000 });
        } finally {
            setLoading(false);
        }
    };
    const showConfirmComplete = (orderId) => {
        confirmDialog({
            message: '¿Marcar orden como completada?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            // accept: () => handleCompleteOrder(orderId),
            accept: () => {
                handleCompleteOrder(orderId);
                setSelectedOrder(null);
            },
            reject: () => {
                toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Has cancelado la operación', life: 2000 });
            }
        });
    };

    const handleCancelOrder = async (orderId) => {
        setLoading(true);
        try {
            const result = await orderService.cancelOrder(orderId);
            if (result.responseCode == 'ORD-002') {
                // const updatedOrders = orders.filter(order => order.orderId !== orderId);
                // setOrders(updatedOrders);  // Actualiza el estado removiendo la orden cancelada
                const newFirst = (orders.length === 1 && first > 0) ? first - rows : first;  // Ajusta 'first' si la página quedará vacía
                await loadOrders(newFirst / rows);  // Recarga las órdenes después de eliminar una
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Orden cancelada exitosamente', life: 2000 });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error canceling the order:', error);
            setError('Error al cancelar la orden: ' + error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message || 'Error cancelando la orden', life: 5000 });
        } finally {
            setLoading(false);
        }
    };
    const showConfirmCancel = (orderId) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas cancelar esta orden?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleCancelOrder(orderId),
            reject: () => {
                toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Has cancelado la operación', life: 2000 });
            }
        });
    };
    
    // Template para mostrar los botones de estado
    const statusBodyTemplate = (rowData) => {
        if (rowData.orderStatus === 'Completado' || rowData.orderStatus === 'Cancelado') {
            return rowData.orderStatus;
        } else {    
            return (
                <div style={styles.statusButtons}>
                    <Button
                        icon="pi pi-check"
                        rounded severity='success'
                        onClick={(e) => {
                            e.stopPropagation();
                            showConfirmComplete(rowData.orderId);
                        }}
                    />
                    <Button
                        icon="pi pi-times"
                        rounded severity='danger'
                        onClick={(e) => {
                            e.stopPropagation();
                            showConfirmCancel(rowData.orderId);
                        }}
                    />
                </div>
            );
        }
    };

    const orderNumberTemplate = (rowData) => {
        return `ORD-${rowData.orderId}`;
    };

    const rowIndexTemplate = (_rowData, options) => {
        return options.rowIndex + 1;  // Calcula el número secuencial
    };

    return (
        <KitchenSiderBar>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div>
                <div style={styles.container}>
                    <div style={styles.listContainer}>
                        {/* <h2>Ordenes</h2> */}
                        <Card title="Ordenes"></Card>
                            <br />
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <DataTable
                            value={orders}
                            selectionMode="single"
                            selection={selectedOrder}
                            onSelectionChange={(e) => setSelectedOrder(e.value)}
                            dataKey="orderId"
                            paginator={true}
                            rows={rows}
                            first={first}
                            totalRecords={totalRecords}
                            onPage={handlePageChange}
                            lazy={true}
                            // loading={loading}
                            >
                            <Column header="#" body={rowIndexTemplate} style={{  textAlign: 'center' }} />
                            <Column field="orderId" header="N° de Orden" body={orderNumberTemplate} style={{ width: '150px', textAlign: 'center' }} />
                            <Column key="orderTimestamp" field="orderTimestamp" header="Hora" body={(rowData) => new Date(rowData.orderTimestamp).toLocaleTimeString()} />
                            <Column key="customerName" field="customerName" header="Cliente" />
                            <Column key="totalDishes" field="orderItems" header="N° Platos" body={(rowData) => rowData.orderItems.length} style={{textAlign: 'center' }} />
                            <Column key="diningOption" field="customerTable" header="Opción de Consumo"  body={(rowData) => rowData.customerTable ? `Mesa: ${rowData.customerTable}` : 'Para llevar'} style={{ textAlign: 'center' }} />
                            <Column key="totalPrice" field="orderItems" header="Precio Total" body={(rowData) => `Bs. ${rowData.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`} style={{ textAlign: 'center' }} />
                            <Column key="orderStatus" field="orderStatus" header="Estado" body={statusBodyTemplate} style={{ textAlign: 'center' }} />
                            
                        </DataTable>
                    </div>
                    <div style={styles.containerItems}>
                    {selectedOrder && (
                        // <OrderDetails order={selectedOrder} />
                        <OrderDetails order={selectedOrder} onConfirmComplete={showConfirmComplete} />

                    )}
                    {!selectedOrder && (    
                        <Card style={{ fontSize: '1rem', fontWeight: '700' }}>Seleccione una orden para ver sus platos</Card>
                    )}
                    </div>
                </div>
            </div>
        </KitchenSiderBar>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#333',
        // padding: '20px',
        paddingTop: '18px',
        borderRadius: '10px',
    },
    listContainer: {
        margingTop: '0px !important',
        width: '65%',
        marginRight: '2%',
        justifyContent: 'center',
        overflowY: 'auto',
        // backgroundColor: '#fff',
    },
    statusButtons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    containerItems:{
            width: '35%',
            borderLeft: '3px solid #ccc',
            paddingLeft: '2.5vh',
    }
};
