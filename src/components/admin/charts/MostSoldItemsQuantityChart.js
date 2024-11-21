import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MostSoldItemsQuantityChart = ({ mostSoldItems }) => {
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
