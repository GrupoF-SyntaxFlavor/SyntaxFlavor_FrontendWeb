import React, { useState, useEffect, useContext } from "react";
import ReportService from "@/service/ReportService";
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import ChartFilter from '@/components/admin/charts/ChartFilter'; // Nuevo componente
import WeeklySalesChart from '@/components/admin/charts/WeeklySalesChart';
import MostSoldItemsQuantityChart from '@/components/admin/charts/MostSoldItemsQuantityChart'; // Actualización del nombre
import MostSoldItemsRevenueChart from '@/components/admin/charts/MostSoldItemsRevenueChart'; // Nuevo componente
import OrdersKPIChart from '@/components/admin/charts/OrdersKPIChart'; // Nuevo componente
import { AuthContext } from "../../../context/AuthContext";

const ReportDashboard = () => {
    const [ordersKPI, setOrdersKPI] = useState({});
    const [weeklySales, setWeeklySales] = useState({});
    const [mostSoldItems, setMostSoldItems] = useState([]);
    const [dates, setDates] = useState(null);  // Almacena las fechas seleccionadas
    const { authToken } = useContext(AuthContext);

    const reportService = new ReportService();

    useEffect(() => {
        reportService.getOrdersKPI(authToken)
        .then(data => setOrdersKPI(data))
        .catch(error => console.error("Failed to fetch orders KPI:", error));

        reportService.getWeeklySalesReport(authToken)
            .then(data => {
                setWeeklySales(data);
            })
            .catch(error => {
                console.error("Failed to fetch weekly sales report:", error);
            });

        reportService.getMostSoldItems(authToken)
            .then(data => {
                setMostSoldItems(data);
            })
            .catch(error => {
                console.error("Failed to fetch most sold item:", error);
            });
    }, [authToken]);

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
                  <OrdersKPIChart ordersKPI={ordersKPI} />
              </div>
              {/* Segunda columna */}
              <div style={styles.gridItem}>
                  <MostSoldItemsQuantityChart mostSoldItems={mostSoldItems} />
              </div>
              <div style={styles.gridItem}>
                  <MostSoldItemsRevenueChart mostSoldItems={mostSoldItems} />
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
