import React, { useState, useEffect, useRef, useContext } from 'react';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { Image } from 'primereact/image';
import withAuth from '@/components/misc/withAuth';
import MenuService from '@/service/MenuService';
import { Dropdown } from 'primereact/dropdown';
import { MenuContext } from '../../../context/MenuContext';

function MenuPage() {
    //contexts
    const { 
        menuItems, 
        loadMenuItems, 
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
        setTotalRecords
    } = useContext(MenuContext);

    const [selectedItem, setSelectedItem] = useState(null); // Ítem seleccionado
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Para saber si es edición o agregar
    const [formValues, setFormValues] = useState({ name: '', description: '', price: null, image_url: '' });

    
    const toast = useRef(null);
    const itemsSort = [ {name: 'Ascendente', code: 'true'}, {name: 'Descendente', code: 'false'}];

    useEffect(() => {
        loadItems(pageNumber); // Cargar ítems al cambiar la paginación
    }, [minPrice, maxPrice, pageNumber, selectedItemSort]);
    
    useEffect(() => {
        console.log("menuItems actualizado:", menuItems);
    }, [menuItems]); 


    const loadItems = async () => {
        try {
            await loadMenuItems();
        } catch (error) {
            console.error('Error loading items:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los ítems', life: 3000 });
        }
    };

    const openDialog = (item = null) => {
        setIsEditMode(!!item); // Si item no es nulo, estamos en modo edición
        setFormValues(item ? { ...item } : { name: '', description: '', price: null, image_url: '' });
        setDialogVisible(true);
    };

    const handleSave = () => {
        if (isEditMode) {
            // Lógica para editar el producto
            console.log("Editando producto:", formValues);
        } else {
            // Lógica para agregar el producto
            console.log("Agregando producto:", formValues);
        }
        setDialogVisible(false); // Cerrar el modal después de guardar
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
        toast.current.show({ severity: 'success', summary: newStatus, detail: `El ítem ${item.name} ha sido ${newStatus.toLowerCase()}`, life: 3000 });
    };

    const actionButtonsTemplate = (option) => (
        <div style={styles.buttonPosition}>
            <Button 
                label="Editar" 
                icon="pi pi-pencil"
                className="p-button-info"
                size="small"     
                style={styles.enableButton}
                onClick={() => openDialog(option)} // Abre el modal en modo edición

            />
            {option.status ? (
                <Button 
                    label="Deshabilitar" 
                    icon="pi pi-times" 
                    className="p-button-danger"
                    size="small"     
                    style={styles.enableButton}
                    onClick={() => showConfirmStatusChange(option, 'Deshabilitar')}
                />
            ) : (
                <Button 
                    label="Habilitar" 
                    icon="pi pi-check" 
                    className="p-button-success"
                    size="small"     
                    style={{...styles.enableButton, marginRight: '0.5rem'}}
                    onClick={() => showConfirmStatusChange(option, 'Habilitar')}
                />
            )}
        </div>
    );
    
    // Actualización de itemTemplate para utilizar actionButtonsTemplate
    const itemTemplate = (option) => {
        return (
            <div 
                className="p-ai-center p-jc-between" 
                style={option.status ? styles.item : styles.disabledItem}
            >
                <div className="p-ai-center" style={styles.itemContent}>
                    <img src={option.image} alt={option.name} style={styles.image} />
                    <div className="p-ml-3 p-4">
                        <div style={styles.label}>{option.name}</div>
                        <div style={styles.description}>{option.description}</div>
                        <div style={styles.price}>Precio: Bs. {option.price}</div>
                    </div>
                </div>
            </div>
        );
    };
    

    // Styles para el componente
    // TODO: Mover a un archivo de estilos
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
        listContainer: {
            flex: selectedItem ? 2 : 1,
            // transition: 'flex 0.3s ease',
        },
        filterContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',  // Adjust to align content horizontally
            gap: '10px',  // Add some space between the elements if necessary
        },
        priceGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',  // Ensure sufficient space between radio buttons
        },
        formContainer: {
            flex: 1,
            display: selectedItem ? 'block' : 'none',
            // transition: 'flex 0.3s ease',
        },
        panel: {
            height: '100%',
        },
        image: {
            width: '5.5rem',
            height: '5.5rem',
            objectFit: 'cover',
            borderRadius: '50%',
        },
        largeImage: {
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
        },
        item: {
            // padding: '0.5rem',
            // borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            //justifyContent: 'space-between',
            alignItems: 'center',
        },
        disabledItem: {
            opacity: 0.5,
            display: 'flex',
            justifyContent: 'space-between',
        },
        itemContent: {
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            overflow: 'hidden',
            width: '1000%',
        },
        label: {
            fontWeight: 'bold',
            // fontSize: '1rem',
        },
        description: {
            color: '#6c757d',
            // fontSize: '0.85rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        },
        price: {
            marginTop: '0.25rem',
            color: '#000',
            // fontSize: '0.9rem',
        },
        enableButton: {
            width: '150px',
            marginLeft: 'auto',
            marginRight: '2px',
            marginBottom: '2px'
        },
        buttonPosition:{
            paddingTop: '3rem',
            paddingRight: '1rem',
        },
        plusButton:{
            width: '150px',
        }
    };

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const imageTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <KitchenSiderBar>
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Modal para agregar/editar */}
            <Dialog 
                header={isEditMode ? "Editar Producto" : "Agregar Producto"} 
                visible={isDialogVisible} 
                style={{ width: 'auto' }} 
                modal 
                onHide={() => setDialogVisible(false)}
                footer={
                    <div>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
                        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
                    </div>
                }
            >
                
                <FloatLabel>
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="description">Descripción</label>
                    <InputText id="description" value={formValues.description} onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} />
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="price">Precio</label>
                    <InputNumber id="price" value={formValues.price} onValueChange={(e) => setFormValues({ ...formValues, price: e.value })}/>
                </FloatLabel>
                <div>
                    <Toast ref={toast}></Toast>

                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                    <FileUpload ref={fileUploadRef} name="demo" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={imageTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>

            </Dialog>

            <div>
                <div style={styles.container}>
                    <div style={styles.listContainer}>
                        <Card title="Productos del Menú"></Card>
                        <br />
                        {/* empieza el filtro */}
                        <div>
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
                                        <Dropdown id="sort" className="flex align-items-center" value={selectedItemSort} onChange={(e) => setSelectedItemSort(e.value)} options={itemsSort} optionLabel="name" optionValue="code" placeholder="Ascendente por nombre" />

                                    </div>     
                                </div>
                            </Card>
                        </div>
                        {/* termina el filtro */}
                        <br />
                        <DataTable
                            value={menuItems}
                            selectionMode="single"
                            selection={selectedItem}
                            onSelectionChange={(e) => setSelectedItem(e.value)}
                            dataKey="id"
                            paginator={true}
                            rows={rows}
                            first={first}
                            totalRecords={totalRecords}
                            onPage={handlePageChange}
                            lazy={true}
                        >
                            <Column header="#" body={(_, options) => options.rowIndex + 1} style={{ textAlign: 'center' }} />
                            <Column field="name" header="Nombre" body={itemTemplate} />
                            <Column 
                                header={
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button 
                                            icon="pi pi-plus" 
                                            className="p-button-success" 
                                            label="Agregar"
                                            onClick={() => openDialog()} 
                                            style={styles.plusButton}
                                        />
                                    </div>
                                } 
                                body={(rowData) => actionButtonsTemplate(rowData)}
                                style={{ textAlign: 'right', width: '100px' }} // Alineación a la derecha para toda la columna
                            />
                        </DataTable>
                        <br />
                    </div>
                    {/* Formulario que aparece al seleccionar un item */}
                    {/* Detalles del ítem seleccionado */}
                    <div style={styles.formContainer}>

                        {selectedItem && (
                            <div>
                                <Card title={`Detalles de ${selectedItem.name}`} style={styles.detailCard}></Card>
                                <br />  
                                <Card>
                                    <img src={selectedItem.image} alt={selectedItem.name} style={styles.largeImage} />
                                    <p><strong>Descripción:</strong> {selectedItem.description}</p>
                                    <p><strong>Precio:</strong> {selectedItem.price} Bs.</p>
                                    <p><strong>Estado:</strong> {selectedItem.status?"Habilitado":"Deshabilitado"}</p>
                                    {/* <p><strong>Fecha de creación:</strong> {new Date(selectedItem.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Última actualización:</strong> {new Date(selectedItem.updatedAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </KitchenSiderBar>
    );
}

export default withAuth(MenuPage);