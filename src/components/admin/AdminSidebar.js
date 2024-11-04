import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/router';
// FIXME: We should have just one side bar, with props to change the sidebar items based on the role
export default function AdminSidebar({ children }) {
    const router = useRouter();
    const menu = useRef(null); // Usamos useRef para controlar el menú desplegable

    const start = (
        <div className="navbar-left">
            <div className="logo-container">
                <img alt="logo" src='https://images.pond5.com/pixel-sushi-vector-illustration-isolated-illustration-155825087_iconm.jpeg' className="logo" />
            </div>
            <span className="navbar-title">Gestión del Restaurante</span>
        </div>
    );

    const items = [
        {
            label: 'Redirigir a cocina',
            icon: 'pi pi-external-link',
            command: () => { router.push('/kitchen/order') } // Redirige a la página de cocina
        },
        {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => { router.push('/login') }
        }
    ];

    const toggleMenu = (event) => {
        menu.current.toggle(event); // Abre o cierra el menú en la posición del evento
    };

    const end = (
        <div className="navbar-right">
            <i className="pi pi-search p-mr-4"></i> {/* Ícono de búsqueda */}
            <i className="pi pi-bell p-mr-4"></i>   {/* Ícono de notificaciones */}
            <div className="user-profile" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrftcp5FwziJftgD1TlYJSl8WcOza-5iX5ZzgBk6gU0YEvN6UwYMa0mfROJOHwm6fBRk&usqp=CAU" alt="user" className="profile-pic" />
                <span>Admin Master</span>  {/* Nombre del usuario */}
                <i className="pi pi-angle-down p-ml-2"></i>  {/* Ícono de menú desplegable */}
            </div>
            <Menu model={items} popup ref={menu} id="popup_menu" />
        </div>
    );

    return (
        <div>
            <Menubar start={start} end={end} className="navbar" />

            <div>
                {/* Sidebar */}
                <div className="sidebar"> 
                    <div className="sidebar-items">
                        {/* <div className="sidebar-item">
                            <Button icon="pi pi-home" className="p-button-text p-button-plain p-button-lg" />
                            <span>Dashboards</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-th-large" className="p-button-text p-button-plain p-button-lg" />
                            <span>Ordenes</span>
                        </div>

                        <div className="sidebar-item">
                            <Button icon="pi pi-wallet" className="p-button-text p-button-plain p-button-lg" />
                            <span>Menú</span>
                        </div> */}
                        <div className="sidebar-item mt-2" onClick={() => router.push('/admin/kitchens')}>
                            <Button icon="pi pi-users" className="p-button-text p-button-plain p-button-lg" />
                            <span>Cuentas de Cocina</span>
                        </div>      
                    </div>
                </div>

                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}
