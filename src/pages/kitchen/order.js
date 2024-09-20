import React, { useState, useEffect } from 'react';
import OrderDetails from '@/components/kitchen/OrderDetails.js';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import OrderService from '@/service/OrderService';  // Importamos el servicio

import 'primeicons/primeicons.css';

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

    const orderService = new OrderService();  // Instanciamos el servicio

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
            const data = await orderService.getOrders(pageNumber, rows);
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
    };

    const handlePageChange = (event) => {
        setFirst(event.first);  // Actualizamos el primer registro visible
        setRows(event.rows);    // Actualizamos el número de registros visibles por página
    };

    const handleCompleteOrder = (orderId) => {
        const updatedOrders = orders.map(order =>
            order.orderId === orderId ? { ...order, status: 'Completado' } : order
        );
        setOrders(updatedOrders);
    };

    const handleCancelOrder = (orderId) => {
        const updatedOrders = orders.map(order =>
            order.orderId === orderId ? { ...order, status: 'Cancelado' } : order
        );
        setOrders(updatedOrders);
    };

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
                            e.stopPropagation();  // Evita seleccionar la fila al hacer clic en el botón
                            handleCompleteOrder(rowData.orderId);
                        }}
                    />
                    <Button
                        icon="pi pi-times"
                        rounded severity='danger'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCancelOrder(rowData.orderId);
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
            <div>
                <h1>Ordenes del día</h1>
                <hr />
                <div style={styles.container}>
                    <div style={styles.listContainer}>
                        <h2>Ordenes</h2>

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
                            // loading={loading}
                            lazy={true}
                        >
                            <Column header="#" body={rowIndexTemplate} style={{ width: '50px' }} />
                            <Column field="orderId" header="N° de Orden" body={orderNumberTemplate} style={{ width: '150px' }} />
                            <Column key="table" field="cutomerTable" header="Mesa" />
                            <Column key="customerName" field="customerName" header="Cliente" />
                            <Column key="totalDishes" field="orderItems" header="Total Platillos" body={(rowData) => rowData.orderItems.length} />
                            <Column key="totalPrice" field="orderItems" header="Precio Total" body={(rowData) => `Bs. ${rowData.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`} />
                            <Column key="orderStatus" field="orderStatus" header="Estado" body={statusBodyTemplate} />
                        </DataTable>
                    </div>

                    {selectedOrder && (
                        <OrderDetails order={selectedOrder} />
                    )}
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
    },
    listContainer: {
        width: '60%',
        marginRight: '2%',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    statusButtons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    containerCard: {
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
};
