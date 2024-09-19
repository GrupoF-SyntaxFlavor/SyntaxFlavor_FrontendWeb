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
    const [totalRecords, setTotalRecords] = useState(0);  // Número total de registros
    const [loading, setLoading] = useState(false);  // Control de carga
    const [error, setError] = useState(null);  // Manejo de errores

    const orderService = new OrderService();  // Instanciamos el servicio

    useEffect(() => {
        loadOrders();  // Cargamos las órdenes cuando se monta el componente
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await orderService.getOrders(0, 10); // Cargar los primeros 10 registros
            setOrders(data.content);  // Actualizamos las órdenes
            setTotalRecords(data.totalElements);  // Total de registros para la paginación
            setError(null);  // Reseteamos errores anteriores si la carga es exitosa
        } catch (err) {
            setError('Error loading orders: ' + err.message);  // Actualizamos el mensaje de error
        } finally {
            setLoading(false);  // Terminamos la carga
        }
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
        return options.rowIndex + 1;  // Calcula el número secuencial basado en el índice
    };

    return (
        <KitchenSiderBar>
            <div>
                <h1>Ordenes del día</h1>
                <hr />
                <div style={styles.container}>
                    <div style={styles.listContainer}>
                        <h2>Ordenes</h2>

                        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar error si existe */}

                        <DataTable
                            value={orders}
                            selectionMode="single"
                            selection={selectedOrder}
                            onSelectionChange={(e) => setSelectedOrder(e.value)}  // Actualiza la orden seleccionada
                            dataKey="orderId"  // Asegúrate de que este sea un valor único para cada fila
                            paginator={true}
                            rows={10}  // Número de filas por página
                            totalRecords={totalRecords}  // Total de registros del backend
                            loading={loading}  // Muestra un indicador de carga si está cargando
                            lazy={true}  // Cargar los datos de forma diferida (bajo demanda)
                        >
                            {/* Columna para enumeración secuencial */}
                            <Column
                                header="#"
                                body={rowIndexTemplate}
                                style={{ width: '50px' }}
                            />
                            
                            {/* Nueva columna para el número de orden formateado */}
                            <Column
                                field="orderId"
                                header="N° de Orden"
                                body={orderNumberTemplate}
                                style={{ width: '150px' }}
                            />

                            <Column key="table" field="cutomerTable" header="Mesa" />
                            <Column key="customerName" field="customerName" header="Cliente" />
                            <Column key="totalDishes" field="orderItems" header="Total Platillos" body={(rowData) => rowData.orderItems.length} />
                            <Column key="totalPrice" field="orderItems" header="Precio Total" body={(rowData) => `Bs. ${rowData.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`} />
                            <Column key="orderStatus" field="orderStatus" header="Estado" body={statusBodyTemplate} />
                        </DataTable>
                    </div>

                    {selectedOrder && (
                        <OrderDetails order={selectedOrder} />  // Mostrar detalles de la orden seleccionada
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
