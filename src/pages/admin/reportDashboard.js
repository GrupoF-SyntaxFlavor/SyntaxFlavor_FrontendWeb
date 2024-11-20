import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportService from "@/service/ReportService";
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import { Card } from 'primereact/card';
import { AuthContext } from "../../../context/AuthContext";

const ReportDashboard = () => {
    const [ordersKPI, setOrdersKPI] = useState({});
    const [orderKPIChartOptions, setOrderKPIChartOptions] = useState({});
    const [weeklySales, setWeeklySales] = useState({});
    const [mostSoldItem, setMostSoldItem] = useState({});
    const [totalOrders, setTotalOrders] = useState({});
    const [acceptedOrders, setAcceptedOrders] = useState({});
    const [cancelledOrders, setCancelledOrders] = useState({});

    const { authToken } = useContext(AuthContext);

    const reportService = new ReportService();

    useEffect(() => {
        reportService.getOrdersKPI(authToken)
            .then(data => {
                setOrdersKPI(data);
                console.log(ordersKPI);
                setAcceptedOrders(ordersKPI.totalAcceptedOrders);
                setCancelledOrders(ordersKPI.totalCancelledOrders);
                setTotalOrders(ordersKPI.totalOrders);

                setOrderKPIChartOptions({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Reporte de Órdenes Aceptadas y Canceladas',
                        align: 'center'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            borderRadius: 5,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)',
                                distance: -50
                            }
                        }
                    },
                    series: [
                        {
                            name: "Porcentaje de órdenes",
                            data: [
                                { name: "Aceptadas", y: acceptedOrders },
                                { name: "Canceladas", y: cancelledOrders }
                            ],
                        }
                    ]
                });
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
            text: "Reporte de Ventas Semanales (7 semanas)",
        },
        xAxis: {
            categories: Object.keys(weeklySales), // Semanas
            title: {
                text: "Semanas",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Ventas (Bs.)",
            },
        },
        series: [
            {
                name: "Ventas",
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

            <Card title="Reportes del Restaurante"></Card>
                <div className="column">
                    <h2 className="p-1">Ventas Semanales</h2>
                    {/* <Card title="Ventas Semanales"></Card>
                    <br/> */}
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
                    <h2>Órdenes</h2>
                    <div className="data-placeholder">
                        { Object.keys(ordersKPI).length > 0 ? (
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={orderKPIChartOptions}
                            />
                        ) : (
                            <div>Cargando datos...</div>
                        )}
                        {JSON.stringify(ordersKPI)}
                    </div>
                </div>
            </div>
        </RoleBasedSidebar>
    );
};

export default ReportDashboard;
