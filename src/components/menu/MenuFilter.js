// MenuFilter.js
import React from 'react';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

const MenuFilter = ({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedItemSort,
    setSelectedItemSort,
    itemsSort
}) => {
    return (
        <Card className="flex align-items-center gap-2 mb-3">
            <div style={styles.filterContainer}>
                <div style={styles.priceGroup}>
                    {/* Input para mínimo precio */}
                    <div className="flex align-items-center">
                        <label htmlFor="minPrice" className="mr-2">Min Precio:</label>
                        <InputNumber id="minPrice" value={minPrice} onValueChange={(e) => setMinPrice(e.value)} placeholder="0.00" />
                    </div>
                    
                    {/* Input para máximo precio */}
                    <div className="flex align-items-center">
                        <label htmlFor="maxPrice" className="mr-2">Max Precio:</label>
                        <InputNumber id="maxPrice" value={maxPrice} onValueChange={(e) => setMaxPrice(e.value)} placeholder="100.00" />
                    </div>

                    {/* Dropdown para selección de orden */}
                    <label htmlFor="sort" className="mr-2">Ordenar por nombre:</label>
                    <Dropdown 
                        id="sort" 
                        className="flex align-items-center" 
                        value={selectedItemSort} 
                        onChange={(e) => setSelectedItemSort(e.value)} 
                        options={itemsSort} 
                        optionLabel="name" 
                        optionValue="code" 
                        placeholder="Ascendente por nombre" 
                    />
                </div>
            </div>
        </Card>
    );
};

// Estilos específicos para el filtro
const styles = {
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
    },
    priceGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    }
};
export default MenuFilter;
