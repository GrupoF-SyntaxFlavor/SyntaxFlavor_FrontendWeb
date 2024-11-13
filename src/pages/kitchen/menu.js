import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { MenuContext } from '../../../context/MenuContext';
import MenuItemForm from '@/components/menu/MenuItemForm';
import MenuList from '@/components/menu/MenuList';
import MenuFilter from '@/components/menu/MenuFilter';
import MenuItemSelected from '@/components/menu/MenuItemSelected';
import RoleBasedSidebar from '@/components/RoleBasedSidebar';
import withAuth from '@/components/misc/withAuth';

function MenuPage() {
    //contexts
    const { 
        menuItems, 
        loadMenuItems, 
        addMenuItem, 
        changeMenuItemStatus, 
        minPrice,
        setMinPrice, 
        maxPrice,
        setMaxPrice, 
        selectedItemSort,
        setSelectedItemSort, 
        pageNumber, 
        setPageNumber,
        first,
        setFirst,
        rows,
        setRows,
        totalRecords,
    } = useContext(MenuContext);

    const [selectedItem, setSelectedItem] = useState(null); // Ítem seleccionado
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Para saber si es edición o agregar
    const [formValues, setFormValues] = useState({ name: '', description: '', price: null, image: '' });
    
    const toast = useRef(null);
    const itemsSort = [ {name: 'Ascendente', code: 'true'}, {name: 'Descendente', code: 'false'}];

    useEffect(() => {
        loadItems(pageNumber); // Cargar ítems al cambiar la paginación
    }, [minPrice, maxPrice, pageNumber, selectedItemSort]);

    useEffect(() => {
        //console.log("menuItems actualizado:", menuItems);
    }, [menuItems]); 


    const openDialog = (item = null) => {
        setIsEditMode(!!item); // Si item no es nulo, estamos en modo edición
        setFormValues(item ? { ...item } : { name: '', description: '', price: null, image: '' });
        setDialogVisible(true);
    };
    
    const loadItems = async () => {
        try {
            await loadMenuItems();
        } catch (error) {
            console.error('Error loading items:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los ítems', life: 3000 });
        }
    };

    const handlePageChange = (event) => {
        setFirst(event.first); // Actualizar la página
        setPageNumber(event.first/rows);
        setRows(event.rows);   // Actualizar la cantidad de filas
    };

    const showConfirmStatusChange = (item, newStatus) => {
        confirmDialog({
        message: `¿Estás seguro de que deseas ${newStatus.toLowerCase()} el ítem ${item.name}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => await handleStatusChange(item, newStatus),
        reject: () => {
            toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Has cancelado la operación', life: 2000 });
        }
        });
    };

    const handleStatusChange = async (item, newStatus) => {
        let updatedStatus;
        if (newStatus === 'Habilitar') {
            updatedStatus = true;
        } else if (newStatus === 'Deshabilitar') {
            updatedStatus = false;
        } else {
            updatedStatus = false; //fallback
        }

        await changeMenuItemStatus(item.id, updatedStatus);
        if (toast.current) {
            toast.current.show({ severity: 'success', summary: newStatus, detail: `El ítem ${item.name} ha sido ${newStatus.toLowerCase()}`, life: 3000 });
        }
    };

    return (
        <RoleBasedSidebar>
            <Toast ref={toast} />
            <div>
                <div style={styles.container}>
                    <div style={{ flex: selectedItem ? 2 : 1 }}>
                        <Card title="Productos del Menú"></Card>
                        <br />
                        {/* empieza el filtro */}
                        <MenuFilter
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            selectedItemSort={selectedItemSort}
                            setSelectedItemSort={setSelectedItemSort}
                            itemsSort={itemsSort}
                        />
                        {/* termina el filtro */}
                        <br />
                        <MenuList
                            menuItems={menuItems}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            rows={rows}
                            first={first}
                            totalRecords={totalRecords}
                            handlePageChange={handlePageChange}
                            openDialog={openDialog}
                            showConfirmStatusChange={showConfirmStatusChange}
                        />
                        <br />
                    </div>
                    {/* Detalles del ítem seleccionado */}
                    <div style={{ ...styles.formContainer, display: selectedItem ? 'block' : 'none' }}>
                        <MenuItemSelected selectedItem={selectedItem} />
                    </div>
                </div>
            </div>
             {/* Modal para agregar/editar */}
             <MenuItemForm
                isVisible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                isEditMode={isEditMode}
                formValues={formValues}
                setFormValues={setFormValues} // Asegúrate de pasar setFormValues como prop
                addMenuItem={addMenuItem} // Pasar addMenuItem como prop
                loadMenuItems={loadMenuItems} 
            />
        </RoleBasedSidebar>
    );
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '18px',
        borderRadius: '10px',
        gap: '1rem',
        height: '100%',
    },
    formContainer: {
        flex: 1,    
    },
};

export default withAuth(MenuPage);