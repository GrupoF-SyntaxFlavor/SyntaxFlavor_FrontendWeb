import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WeeklySalesChart = ({ weeklySales }) => {
    // Array de colores para las 7 semanas
    const colorsArray = ["#1f77b4", "#38184C", "#04BF8A", "#DBF227", "#015958", "#03A64A","#005C53",];

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
                data: Object.values(weeklySales).map((value, index) => ({
                    y: value, // Valor de la barra
                    color: colorsArray[index % colorsArray.length], // Asigna un color del array
                })),
            },
        ],
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false, // Oculta la leyenda
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
