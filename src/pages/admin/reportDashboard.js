import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportService from "@/service/ReportService";
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import { AuthContext } from "../../../context/AuthContext";

const ReportDashboard = () => {
    const [ordersKPI, setOrdersKPI] = useState({});
    const [weeklySales, setWeeklySales] = useState({});
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
    }, [authToken]);

    const weeklySalesChartOptions = {
        chart: {
            type: "column",
        },
        title: {
            text: "Weekly Sales Report",
        },
        xAxis: {
            categories: Object.keys(weeklySales), // Semanas
            title: {
                text: "Weeks",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Sales (Bs.)",
            },
        },
        series: [
            {
                name: "Sales",
                data: Object.values(weeklySales), // Ventas
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return (
        <RoleBasedSidebar>
            <div className="report-dashboard">
                <div className="column">
                    <h2>Weekly Sales</h2>
                    {Object.keys(weeklySales).length > 0 ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={weeklySalesChartOptions}
                        />
                    ) : (
                        <div>Loading Weekly Sales Data...</div>
                    )}
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
        </RoleBasedSidebar>
    );
};

export default ReportDashboard;