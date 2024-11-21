import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loader from "../../../components/misc/Loader";

const OrdersKPIChart = ({ ordersKPI }) => {
    if (!ordersKPI) {
        return <Loader />;
    }

    const acceptedOrders = ordersKPI.totalAcceptedOrders || 0;
    const cancelledOrders = ordersKPI.totalCancelledOrders || 0;
    const totalOrders = ordersKPI.totalOrders || 0;
    const pendingOrders = totalOrders - acceptedOrders - cancelledOrders;

    // Array de colores
    const colorsArray = ["#03A64A", "#FF5F5D", "#DBF227"]; // Aceptadas, Canceladas, Pendientes

    const chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        title: {
            text: "Reporte de Órdenes Aceptadas y Canceladas",
            align: "center",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)",
                    distance: 10,
                    style: {
                        fontSize: "14px", // Cambia el tamaño de la letra aquí
                        fontWeight: "light",
                    },
                },
            },
        },
        series: [
            {
                name: "Porcentaje de órdenes",
                data: [
                    { name: "Aceptadas", y: acceptedOrders, color: colorsArray[0] },
                    { name: "Canceladas", y: cancelledOrders, color: colorsArray[1] },
                    { name: "Pendientes", y: pendingOrders, color: colorsArray[2] },
                ],
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
};

export default OrdersKPIChart;
