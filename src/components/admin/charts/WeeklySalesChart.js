import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WeeklySalesChart = ({ weeklySales }) => {
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
        <div>
            {Object.keys(weeklySales).length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={weeklySalesChartOptions}
                />
            ) : (
                <div>Cargando datos de ventas semanales...</div>
            )}
        </div>
    );
};

export default WeeklySalesChart;
