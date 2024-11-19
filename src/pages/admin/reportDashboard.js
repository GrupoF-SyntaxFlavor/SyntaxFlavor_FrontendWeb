import React, { useState, useEffect, useContext } from "react";
import ReportService from "@/service/ReportService";
import { AuthContext } from "../../../context/AuthContext";

const ReportDashboard = () => {
    const [ordersKPI, setOrdersKPI] = useState({});
    const [weeklySales, setWeeklySales] = useState([]);
    const [mostSoldItem, setMostSoldItem] = useState({});

    const { authToken } = useContext(AuthContext);

    const reportService = new ReportService();

    useEffect(() => {
        reportService.getOrdersKPI(authToken)
            .then(data => {
                setOrdersKPI(data);
            })
            .catch(error => {
                console.error("Failed to fetch orders KPI:", error);
            });

        reportService.getWeeklySalesReport(authToken)
            .then(data => {
                setWeeklySales(data);
            })
            .catch(error => {
                console.error("Failed to fetch weekly sales report:", error);
            });

        reportService.getMostSoldItems(authToken)
            .then(data => {
                setMostSoldItem(data);
            })
            .catch(error => {
                console.error("Failed to fetch most sold item:", error);
            });
    }, []);


    return (
        <div className="report-dashboard">
            <div className="column">
                <h2>Weekly Sales</h2>
                <div className="data-placeholder">Gráfico de Barras</div>
                <div className="data-placeholder">
                    {JSON.stringify(weeklySales)}
                </div>
            </div>
            <div className="column">
                <h2>Most Sold Item</h2>
                <div className="data-placeholder">Grafico de barras horizontal</div>
                <div className="data-placeholder">
                    {JSON.stringify(mostSoldItem)}
                </div>
            </div>
            <div className="column">
                <h2>Completed Orders</h2>
                <div className="data-placeholder">Grafico de torta</div>
                <div className="data-placeholder">
                    {JSON.stringify(ordersKPI)}
                </div>
            </div>
        </div>
    );
};

export default ReportDashboard;