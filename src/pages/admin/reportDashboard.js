import React, { useState, useEffect, useContext } from "react";
import ReportService from "@/service/ReportService";
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import ChartFilter from '@/components/admin/charts/ChartFilter'; // Nuevo componente
import WeeklySalesChart from '@/components/admin/charts/WeeklySalesChart';
import MostSoldItemsQuantityChart from '@/components/admin/charts/MostSoldItemsQuantityChart'; // Actualización del nombre
import MostSoldItemsRevenueChart from '@/components/admin/charts/MostSoldItemsRevenueChart'; // Nuevo componente
import OrdersKPIChart from '@/components/admin/charts/OrdersKPIChart'; // Nuevo componente
import { formatDate, getCurrentDayRange } from "../../../util/dateUtils";
import ResouceNotFound from '@/components/misc/ResourceNotFound'; // Nuevo componente
import Loader from '@/components/misc/Loader'; // Nuevo componente
import { AuthContext } from "../../../context/AuthContext";

const ReportDashboard = () => {
    const [ordersKPI, setOrdersKPI] = useState({});
    const [ordersKPIError, setOrdersKPIError] = useState(null); // Nuevo estado para manejar el error
    const [weeklySales, setWeeklySales] = useState({});
    const [mostSoldItems, setMostSoldItems] = useState([]);
    const [dates, setDates] = useState(getCurrentDayRange()); 
    const { authToken } = useContext(AuthContext);

    const reportService = new ReportService();

    useEffect(() => {
        if (dates && dates.length === 2 && dates[0] && dates[1]) { // Verifica que ambos valores existan
            const startDate = formatDate(dates[0]); // Formatea la fecha inicial
            const endDate = formatDate(dates[1], false); // Formatea la fecha final
            reportService.getWeeklySalesReport(authToken)
                .then(data => {
                    setWeeklySales(data);
                })
                .catch(error => {
                    console.error("Failed to fetch weekly sales report:", error);
                });

                reportService.getOrdersKPI(authToken, startDate, endDate)
                .then(data => {
                    if (data) {
                        setOrdersKPI(data);
                        setOrdersKPIError(null); // Limpia cualquier error previo
                    } else {
                        setOrdersKPI({});
                        setOrdersKPIError("No existen órdenes en el rango de fechas seleccionado.");
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch orders KPI:", error);
                    setOrdersKPI({});
                    setOrdersKPIError("No existen órdenes en el rango de fechas seleccionado.");
                });

            reportService.getMostSoldItems(authToken, startDate, endDate)
                .then(data => {
                    setMostSoldItems(data);
                })
                .catch(error => {
                    console.error("Failed to fetch most sold item:", error);
                });
        }
    }, [authToken,dates]);

    return (
        <RoleBasedSidebar>
          <div className="report-dashboard">
            <ChartFilter dates={dates} setDates={setDates} />
            <br />   
            <div style={styles.gridContainer}>
              {/* Primera columna */}
                <div style={styles.gridItem}>
                    <WeeklySalesChart weeklySales={weeklySales} />
                </div>
                <div style={styles.gridItem}>
                    {ordersKPIError ? (
                        <div style={styles.noDataMessage}>
                            <ResouceNotFound /> {/* Muestra la imagen personalizada */}
                        </div>
                    ) : (
                        <OrdersKPIChart ordersKPI={ordersKPI} />
                    )}
                </div>
                {/* Segunda columna */}
                <div style={styles.gridItem}>
                    {mostSoldItems.length > 0 ? (
                    <MostSoldItemsQuantityChart mostSoldItems={mostSoldItems} />
                    ) : (
                    <div style={styles.noDataMessage}>
                        {dates && dates.length === 2 
                            ? 
                             <ResouceNotFound/> 
                            : <Loader />}
                    </div>
                    )}
                </div>
                <div style={styles.gridItem}>
                    {mostSoldItems.length > 0 ? (
                        <MostSoldItemsRevenueChart mostSoldItems={mostSoldItems} />
                    ) : (
                        <div style={styles.noDataMessage}>
                        {dates && dates.length === 2 
                            ? 
                             <ResouceNotFound/> 
                            : <Loader />}
                        </div>
                    )}
                </div>
            </div>  
          </div>
        </RoleBasedSidebar>
    );
};
const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columnas de igual tamaño
    gap: "10px", // Espaciado entre las tarjetas
    padding: "20px", // Espaciado alrededor de las tarjetas
  },
  gridItem: {
      backgroundColor: "#fff", // Fondo blanco para las gráficas
      padding: "10px", // Espaciado interno de cada gráfica
      borderRadius: "8px", // Bordes redondeados
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para un diseño más limpio
  },
};

export default ReportDashboard;
