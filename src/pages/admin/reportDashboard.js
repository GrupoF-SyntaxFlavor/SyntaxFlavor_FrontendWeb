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
    const [mostSoldItems, setMostSoldItems] = useState([]);


    const { authToken } = useContext(AuthContext);

    const reportService = new ReportService();

    useEffect(() => {
        reportService.getOrdersKPI(authToken)
            .then(data => {
                setOrdersKPI(data);
                console.log(ordersKPI);
                const acceptedOrders = data.totalAcceptedOrders || 0;
                const cancelledOrders = data.totalCancelledOrders || 0;
                const totalOrders = data.totalOrders || 0;
                const pendingOrders = totalOrders-acceptedOrders-cancelledOrders;

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
                                { name: "Canceladas", y: cancelledOrders },
                                { name: "Pendientes", y: pendingOrders }
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
                setMostSoldItems(data);
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

    const barChartOptionsQuantity = {
        chart: {
          type: "bar",
        },
        title: {
          text: "Platillos Más Vendidos (Cantidad)",
        },
        xAxis: {
          categories: mostSoldItems.map((item) => item.menuItemName), // Nombres de los platillos
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Cantidad Vendida",
            align: "high",
          },
        },
        series: [
          {
            name: "Cantidad",
            data: mostSoldItems.map((item) => item.totalQuantity), // Cantidades
          },
        ],
        credits: {
          enabled: false,
        },
      };
    
      const barChartOptionsRevenue = {
        chart: {
          type: "bar",
        },
        title: {
          text: "Platillos Más Vendidos (Ingresos)",
        },
        xAxis: {
          categories: mostSoldItems.map((item) => item.menuItemName), // Nombres de los platillos
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Ingresos (Bs.)",
            align: "high",
          },
        },
        series: [
          {
            name: "Ingresos",
            data: mostSoldItems.map((item) => item.totalPrice), // TotalPrice
          },
        ],
        credits: {
          enabled: false,
        },
      };
    
      /* const pieChartOptions = {
        chart: {
          type: "pie",
        },
        title: {
          text: "Distribución de Ventas por Platillo",
        },
        series: [
          {
            name: "Porcentaje",
            colorByPoint: true,
            data: mostSoldItems.map((item) => ({
              name: item.menuItemName,
              y: item.percentage * 100, // Convertimos el porcentaje a un valor entre 0 y 100
            })),
          },
        ],
        credits: {
          enabled: false,
        },
      };
 */
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
                <Card title="Reportes del Restaurante"></Card>
                <div className="column">
                <h2>Platillos Más Vendidos (Cantidad)</h2>
                {mostSoldItems.length > 0 ? (
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={barChartOptionsQuantity}
                    />
                ) : (
                    <div>Cargando datos...</div>
                )}
                </div>
                <div className="column">
                <h2>Platillos Más Vendidos (Ingresos)</h2>
                {mostSoldItems.length > 0 ? (
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={barChartOptionsRevenue}
                    />
                ) : (
                    <div>Cargando datos...</div>
                )}
                </div>
                {/* <div className="column">
                <h2>Distribución de Ventas</h2>
                {mostSoldItems.length > 0 ? (
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={pieChartOptions}
                    />
                ) : (
                    <div>Cargando datos...</div>
                )}
                </div> */}
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
                    </div>
                </div>
            </div>
        </RoleBasedSidebar>
    );
};

export default ReportDashboard;
