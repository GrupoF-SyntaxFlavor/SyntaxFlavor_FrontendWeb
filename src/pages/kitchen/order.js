import React, { useState, useEffect, useRef, useContext } from 'react';
import OrderDetails from '@/components/kitchen/OrderDetails.js';
import RoleBasedSidebar from '@/components/RoleBasedSidebar';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';

import OrderService from '@/service/OrderService';
import withAuth from '@/components/misc/withAuth';
import { AuthContext } from '../../../context/AuthContext';
import { formatDate, getCurrentDayRange } from "../../../util/dateUtils";

function OrdersPage() {
    const { authToken } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);  // Almacena las órdenes desde el backend
    const [selectedOrder, setSelectedOrder] = useState(null);  // Almacena la orden seleccionada
    const [first, setFirst] = useState(0);  // Control de paginación (inicio)
    const [rows, setRows] = useState(10);  // Cantidad de filas por página
    const [totalRecords, setTotalRecords] = useState(0);  // Número total de registros
    const [loading, setLoading] = useState(false);  // Control de carga
    const [error, setError] = useState(null);  // Almacena el error si ocurre
    const [isLastPage, setIsLastPage] = useState(false);  // Bandera para saber si estamos en la última página
    const [dates, setDates] = useState(null);  // Almacena las fechas seleccionadas
    const [status, setStatus] = useState('Pendiente'); 
    const [selectedItem, setSelectedItem] = useState("true");
    const items = [ {name: 'Ascendente', code: 'true'}, {name: 'Descendente', code: 'false'}];
    
    let pollingInterval = null;  // Variable para almacenar el intervalo del polling

    const orderService = new OrderService(); 
    const toast = useRef(null);

    useEffect(() => {
        // Si estamos en la última página, iniciamos el polling
        if (isLastPage) {
            pollingInterval = setInterval(() => {
                console.log('Polling on last page...');
                const selectedDates = dates ? dates : getCurrentDayRange();  // Usa las fechas seleccionadas o el rango del día actual por defecto
                const formattedDates = [
                    formatDate(new Date(selectedDates[0]), true),  // Formatea el startDate (00:00:00)
                    formatDate(new Date(selectedDates[1]), false)  // Formatea el endDate (23:59:59)
                ];
        
                //console.log('Fechas a utilizar:', formattedDates);                
                loadOrders(authToken, first / rows, formattedDates);
            }, 10000);  // Polling cada 10 segundos

            // Limpiamos el intervalo al salir de la última página o cuando el componente se desmonte
            return () => clearInterval(pollingInterval);
        } else {
            // Si no estamos en la última página, limpiar cualquier intervalo de polling
            clearInterval(pollingInterval);
        }
    }, [isLastPage, authToken, first, rows, status, dates, selectedItem]);

    const loadOrders = async (authToken, pageNumber, formattedDates = []) => {
        setLoading(true);
        try {
            const [startDate, endDate] = formattedDates;
            const data = await orderService.getOrdersByStatus(status, pageNumber, selectedItem, startDate, endDate, authToken); 
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

    useEffect(() => {
        if (authToken) {
            const selectedDates = dates ? dates : getCurrentDayRange();
            const formattedDates = [
                formatDate(new Date(selectedDates[0]), true),
                formatDate(new Date(selectedDates[1]), false)
            ];
            loadOrders(authToken, first / rows, formattedDates);
        }
    }, [authToken, first, rows, status, dates, selectedItem]);

    const getCurrentDayRange = () => {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        return [startOfDay, endOfDay];
    };
     
    const handlePageChange = (event) => {
        setFirst(event.first);  // Actualizamos el primer registro visible
        setRows(event.rows);    // Actualizamos el número de registros visibles por página
    };

    const handleCompleteOrder = async (orderId) => {
        setLoading(true); // Activa el estado de carga
        try {
            const result = await orderService.completeOrder(orderId, authToken);
            
            if (result.responseCode === 'ORD-003') {
                // Ajusta `first` si la página queda vacía después de completar una orden
                const newFirst = (orders.length === 1 && first > 0) ? first - rows : first;
    
                // Usa el rango de fechas seleccionado o el rango del día actual
                const selectedDates = dates || getCurrentDayRange();
                
                // Formatea las fechas para enviarlas al servicio
                const formattedDates = [
                    formatDate(new Date(selectedDates[0]), true),  // Inicio del día
                    formatDate(new Date(selectedDates[1]), false) // Fin del día
                ];
    
                // Recarga las órdenes después de completar la actual
                await loadOrders(authToken, newFirst / rows, formattedDates);
    
                // Muestra un mensaje de éxito
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Orden completada exitosamente', life: 2000 });
            } else {
                // Lanza un error si la respuesta del servicio no es exitosa
                throw new Error(result.message);
            }
        } catch (error) {
            // Maneja errores y muestra un mensaje correspondiente
            console.error('Error completing the order:', error);
            setError('Error al completar la orden: ' + error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message || 'Error completando la orden', life: 5000 });
        } finally {
            setLoading(false); // Desactiva el estado de carga
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
        setLoading(true)
        try {
            const result = await orderService.cancelOrder(orderId, authToken);
            if (result.responseCode == 'ORD-002') {
                const newFirst = (orders.length === 1 && first > 0) ? first - rows : first;  // Ajusta 'first' si la página quedará vacía
                const selectedDates = dates ? dates : getCurrentDayRange();  // Usa las fechas seleccionadas o el rango del día actual por defecto
                const formattedDates = [
                    formatDate(new Date(selectedDates[0]), true),  // Formatea el startDate (00:00:00)
                    formatDate(new Date(selectedDates[1]), false)  // Formatea el endDate (23:59:59)
                ];
                await loadOrders(authToken, newFirst / rows, formattedDates);
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
        if (rowData.orderStatus === 'Entregado' || rowData.orderStatus === 'Cancelado') {
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
        <RoleBasedSidebar>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div>
                <div style={styles.container}>
                    <div style={styles.listContainer}>
                        {/* <h2>Ordenes</h2> */}
                        <Card title="Ordenes"></Card>
                            <br />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        <Card className="flex align-items-center gap-2 mb-3">
                            <div style={styles.filterContainer} >
                                <div style={styles.statusGroup}>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="status1" name="orderStatus" value="Pendiente" onChange={(e) => setStatus(e.value)} checked={status === 'Pendiente'} />
                                        <label htmlFor="status1" className="ml-2">Pendiente</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="status2" name="orderStatus" value="Entregado" onChange={(e) => setStatus(e.value)} checked={status === 'Entregado'} />
                                        <label htmlFor="status2" className="ml-2">Entregado</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="status3" name="orderStatus" value="Cancelado" onChange={(e) => setStatus(e.value)} checked={status === 'Cancelado'} />
                                        <label htmlFor="status3" className="ml-2">Cancelado</label>
                                    </div>
                                    
                                </div>
                                <Calendar value={dates} onChange={(e) => setDates(e.value)} placeholder="Rango de Fecha" selectionMode="range" dateFormat='yy/mm/dd'readOnlyInput hideOnRangeSelection style={styles.calendar} />
                                <Dropdown value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={items} optionLabel="name" optionValue="code" placeholder="Ascendente" className="w-full md:w-14rem" />
                            </div>
                        </Card>
                        <br />
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
        </RoleBasedSidebar>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '18px',
        borderRadius: '10px',
    },
    listContainer: {
        margingTop: '0px !important',
        width: '65%',
        marginRight: '2%',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    statusButtons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    containerItems: {
        width: '35%',
        borderLeft: '3px solid #ccc',
        paddingLeft: '2.5vh',
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',  // Adjust to align content horizontally
        gap: '10px',  // Add some space between the elements if necessary
    },
    statusGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',  // Ensure sufficient space between radio buttons
    },
    calendar: {
        marginLeft: '10px', 
    },
    ml2: {
        marginLeft: '8px',
    }
};
export default withAuth(OrdersPage);