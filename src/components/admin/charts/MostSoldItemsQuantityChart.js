import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MostSoldItemsQuantityChart = ({ mostSoldItems }) => {
    const colorsArray = ["#015958", "#04BF8A", "#008F8C", "#023535",  "#03A64A"]; // Array de colores

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
            labels: {
                style: {
                    fontSize: "15px", 
                },
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
                data: mostSoldItems.map((item, index) => ({
                    y: item.totalQuantity,
                    color: colorsArray[index % colorsArray.length], // Asignar color cíclico
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
            {mostSoldItems.length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={barChartOptionsQuantity}
                />
            ) : (
                <div>Cargando datos de los platillos más vendidos...</div>
            )}
        </div>
    );
};

export default MostSoldItemsQuantityChart;
