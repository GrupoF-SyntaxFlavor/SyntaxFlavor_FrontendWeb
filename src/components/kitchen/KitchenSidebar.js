import React, { useState, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useRouter } from "next/router";
import 'primeicons/primeicons.css';

export default function KitchenSidebar({ children }) {
    const [visible, setVisible] = useState(false);  // Controla la visibilidad del menú desplegable
    const router = useRouter();
    const menu = useRef(null); // Usamos useRef para el popup del menú

    const start = (
        <div className="navbar-left">
            <div className="logo-container">
                <img alt="logo" src='https://images.pond5.com/pixel-sushi-vector-illustration-isolated-illustration-155825087_iconm.jpeg' className="logo" />
            </div>
            <span className="navbar-title">Gestión de la Cocina</span>
        </div>
    );

    const items = [
        {
            label: 'Control de cuentas',
            icon: 'pi pi-user-plus',
            command: () => { router.push('/admin/kitchens') }
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
                router.push('/login');
            }
        },
    ];

    const toggleMenu = (event) => {
        menu.current.toggle(event); // Abre o cierra el menú en la posición del evento
    };

    const end = (
        <div className="navbar-right">
            <i className="pi pi-search p-mr-4"></i>
            <i className="pi pi-bell p-mr-4"></i>
            <div className="user-profile" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrftcp5FwziJftgD1TlYJSl8WcOza-5iX5ZzgBk6gU0YEvN6UwYMa0mfROJOHwm6fBRk&usqp=CAU" alt="user" className="profile-pic" />
                <span>Kitchen Master</span>
                <i className="pi pi-angle-down p-ml-2"></i> 
            </div>
            <Menu model={items} popup ref={menu} id="popup_menu"/>
        </div>
    );

    return (
        <div>
            <Menubar start={start} end={end} className="navbar" />
            <div>
                <div className="sidebar">
                    <div className="sidebar-items">
                        <div className="sidebar-item">
                            <Button icon="pi pi-home" className="p-button-text p-button-plain p-button-lg" />
                            <span>Dashboards</span>
                        </div>

                        <div className="sidebar-item" onClick={() => router.push('/kitchen/order')}>
                            <Button icon="pi pi-th-large" className="p-button-text p-button-plain p-button-lg" />
                            <span>Ordenes</span>
                        </div>

                        <div className="sidebar-item" onClick={() => router.push('/kitchen/menu')}>
                            <Button icon="pi pi-wallet" className="p-button-text p-button-plain p-button-lg" />
                            <span>Menú</span>
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
