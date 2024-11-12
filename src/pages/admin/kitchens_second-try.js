import React, { useState, useEffect, useRef, useContext } from 'react';
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/router'; 
import Loader from '@/components/misc/Loader';

import UserService from "@/service/UserService";
import withAuth from '@/components/misc/withAuth';
import { AuthContext } from '../../../context/AuthContext';
import { map, padStart } from 'lodash';

function KitchenAccountsPage() {
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
    
    const [nameSearch, setNameSearch] = useState("");
    const router = useRouter(); 

    console.log("authToken",authToken);
    
    let pollingInterval = null;  // Variable para almacenar el intervalo del polling

    const userService = new UserService(); 
    const toast = useRef(null);

    const handleSearchChange = (event) => {
        setNameSearch(event.target.value);
    };

    const handleCreateAccountClick = () => {
        router.push("/admin/kitchen-account-form");

    };

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
        
                console.log('Fechas a utilizar:', formattedDates);                
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
            const [startDate, endDate] = formattedDates; // Supone que tienes un rango de fechas (opcional)
            const data = await userService.getKitchenUsers2(pageNumber, pageSize, 'name', 'asc', authToken); 
            console.log('data', data);
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

    return (
        <RoleBasedSidebar>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div style={styles.container}>
                <Card title="Usuarios"></Card>
                <div style={styles.searchAndButtonContainer} className="flex align-items-center gap-2 mb-3">
                    <InputText
                        value={nameSearch}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre111"
                        className="w-full"
                        // style={styles.searchBar}
                    />
                    <Button 
                        label="Crear cuenta" 
                        onClick={handleCreateAccountClick} 
                        className="p-button-success"
                        style={styles.createAccountButton}
                    />
                </div>
                {loading ? (
                    <div style={styles.loaderContainer}>
                        <Loader />
                    </div>
                ) : (
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
                            <Column field="index" header="#" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} />
                            <Column field="name" header="Nombre de usuario" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} 
                            body={(rowData) => rowData.name}/>
                            <Column field="email" header="Correo electrónico" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} 
                            body={(rowData) => rowData.email}/>
                            <Column field="userId" header="Ubicación" bodyStyle={styles.tableRow} headerStyle={styles.tableHeader} 
                            body={(rowData) => rowData.userId}/>
                        </DataTable>
                )}
            </div>
        </RoleBasedSidebar>
    );
}

const styles = {
    container: {
        paddingTop: '18px',
        borderRadius: '10px',
    },
    searchAndButtonContainer: {
        display: "flex",
        marginBottom: "3px",
        paddingTop: "15px",
        // justifyContent: "flex-start",
        alignItems: "center",
    },
    createAccountButton: {
        width: "10%", 
        height:"45px",
        padding: "0px", 
    },
    searchAndButtonContainer: {
        display: "flex",
        marginBottom: "3px",
        paddingTop: "15px",
        // justifyContent: "flex-start",
        alignItems: "center",
    },
    tableRow: {
        // aumentar el largo de la columna
        padding: "1.5vh",
        // fontSize: "22px",
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center",  // Centra horizontalmente
        alignItems: "center",       // Centra verticalmente
        height: "70vh",             // Ajusta el alto del contenedor para centrar verticalmente
    },
};
export default withAuth(KitchenAccountsPage);