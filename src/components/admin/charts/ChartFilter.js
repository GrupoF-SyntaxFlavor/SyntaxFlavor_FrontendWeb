import React from 'react';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';

const ChartFilter = ({ dates, setDates }) => {
    const styles = {
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Para separar el título y el calendario
            padding: '10px',
        },
        title: {
            fontWeight: 'bold',
            fontSize: '23px',
            margin: 0,
        },
        calendar: {
            marginLeft: '20px', // Espacio entre el título y el calendario
        },
    };

    return (
        <Card>
            <div style={styles.cardHeader}>
                <span style={styles.title}>Reportes del Restaurante</span>
                <Calendar
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    placeholder="Rango de Fecha"
                    selectionMode="range"
                    dateFormat="yy/mm/dd"
                    readOnlyInput
                    hideOnRangeSelection
                    style={styles.calendar}
                />
            </div>
        </Card>
    );
};

export default ChartFilter;
