import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MostSoldItemsRevenueChart = ({ mostSoldItems }) => {
    const colorsArray = ["#042940", "#005C53",  "#04BF8A","#9FC131", "#DBF227"]; // Array de colores

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
            labels: {
                style: {
                    fontSize: "15px", 
                },
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
                data: mostSoldItems.map((item, index) => ({
                    y: item.totalPrice,
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
                    options={barChartOptionsRevenue}
                />
            ) : (
                <div>Cargando datos de los ingresos...</div>
            )}
        </div>
    );
};

export default MostSoldItemsRevenueChart;
