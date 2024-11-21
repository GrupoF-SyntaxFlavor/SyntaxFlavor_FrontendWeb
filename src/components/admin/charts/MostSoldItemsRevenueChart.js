import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MostSoldItemsRevenueChart = ({ mostSoldItems }) => {
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
