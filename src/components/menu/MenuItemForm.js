// MenuItemForm.js
import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';

const MenuItemForm = ({ isVisible, onHide, isEditMode, formValues, setFormValues, addMenuItem, loadMenuItems}) => {
    const toast = useRef(null);
    const imageUploaded = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const handleSave = async () => {
        if (isEditMode) {
            console.log("Editando producto:", formValues);
            // Aquí se podría llamar a una función de edición si se necesita
        } else {    
            try {
                await addMenuItem(formValues);
                console.log("Producto agregado exitosamente:", formValues);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto agregado', life: 3000 });
    
                // Recargar la lista de ítems para reflejar el nuevo producto
                await loadMenuItems();
                setTotalSize(0);
                onHide(); // Cierra el modal después de guardar exitosamente
            } catch (error) {
                console.error('Error adding item:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el producto', life: 3000 });
            }
        }
    };

    // Función para manejar la selección de un archivo y calcular su tamaño
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        const file = e.files[0]; // Obtiene el único archivo seleccionado

        if (file) {
            _totalSize += file.size || 0; // Suma el tamaño del archivo seleccionado al tamaño total
            setFormValues(prevFormValues => ({
                ...prevFormValues,
                image: file // Guarda el archivo de imagen en formValues
            }));
        }

        setTotalSize(_totalSize); // Actualiza el estado del tamaño total con el nuevo valor
        //toast.current.show({ severity: 'info', summary: 'Éxito', detail: 'Archivo Subido' }); // Muestra una notificación de éxito
    };
    
    // Función para manejar la carga del archivo y mostrar una notificación de éxito
    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        let file = e.files[0]; // Obtiene el único archivo subido
    
        if (file) {
            _totalSize = file.size || 0;// Asigna el tamaño del archivo al tamaño total
        }
    
        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Éxito', detail: 'Archivo Subido' }); // Muestra una notificación de éxito
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            image: '' // Elimina el archivo de imagen de formValues
        }));
    };

    //header del campo de las imágenes
    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = imageUploaded && imageUploaded.current ? imageUploaded.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    //Campo que se muestra una vez se sube una imagen 
    const imageTemplate = (file) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '100%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                    </span>
                </div>
                
                
            </div>
        );
    };

    //Campo que se muestra antes de subir una imagen
    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={styles.dragAndDrop} className="my-5">
                    Arrastra y Suelta la Imagen Aquí
                </span>
            </div>
        );
    };

    return (
        <Dialog 
            header={isEditMode ? "Editar Producto" : "Agregar Producto"} 
            visible={isVisible} 
            style={{ width: 'auto' }} 
            modal 
            onHide={onHide}
            footer={
                <div>
                    <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                    <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
                </div>
            }
        >
            <FloatLabel style={styles.floatLabelContainer}>
                <label htmlFor="name" style={styles.labelText}>Nombre</label>
                <InputText id="name" style={styles.inputContainer} value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
            </FloatLabel>
            <FloatLabel style={styles.floatLabelContainer}>
                <label htmlFor="description" style={styles.labelText}>Descripción</label>
                <InputTextarea  id="description" style={styles.inputContainer} value={formValues.description} onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} rows={5} cols={30} />
            </FloatLabel>
            <FloatLabel style={styles.floatLabelContainer}>
                <label htmlFor="price" style={styles.labelText}>Precio en Bs.</label>
                <InputNumber id="price" style={styles.inputContainer} value={formValues.price} onValueChange={(e) => setFormValues({ ...formValues, price: e.value })}/>
            </FloatLabel>

            <div >
                {/* Img Input */}
                <label htmlFor="img" style={styles.labelText}>Subir Imagen (.jpg, .jpeg, .png{/* , .webp, .bmp */})</label>
                <Toast ref={toast}></Toast>

                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                <FileUpload ref={imageUploaded} name="demo" accept=".jpg, .jpeg, .png" maxFileSize={1000000}
                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={imageTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
            </div>
        </Dialog>
    );
};
const styles = {
    //add-ons and Modal
    floatLabelContainer: {
        marginTop: '25px',
        marginBottom: '30px',
    },
    inputContainer:{
        width: '100%',
    },
    labelText:{
        fontSize:'17px'
    },
    //image
    dragAndDrop:{
        fontSize: '15px',
        color: 'var(--text-color-secondary)',
    },
    formatSize:{
        marginLeft:'5px',
        width: '100px'
    }
};
export default MenuItemForm;
