import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OrdersKPIChart = ({ ordersKPI }) => {
    const acceptedOrders = ordersKPI.totalAcceptedOrders || 0;
    const cancelledOrders = ordersKPI.totalCancelledOrders || 0;
    const totalOrders = ordersKPI.totalOrders || 0;
    const pendingOrders = totalOrders - acceptedOrders - cancelledOrders;

    const chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Reporte de Órdenes Aceptadas y Canceladas',
            align: 'center',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)',
                    distance: -50,
                },
            },
        },
        series: [
            {
                name: "Porcentaje de órdenes",
                data: [
                    { name: "Aceptadas", y: acceptedOrders },
                    { name: "Canceladas", y: cancelledOrders },
                    { name: "Pendientes", y: pendingOrders },
                ],
            },
        ],
    };

    return (
        <div>
            {Object.keys(ordersKPI).length > 0 ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            ) : (
                <div>Cargando datos...</div>
            )}
        </div>
    );
};

export default OrdersKPIChart;
